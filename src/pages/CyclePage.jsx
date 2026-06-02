import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import { useWeb3 } from "../context/Web3Context";
import "../styles/dashboard.css";
import "../styles/styles.css";
import { toast } from "react-toastify";

const CyclePage = () => {
  const { account, contract } = useWeb3();

  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [claimedIndexes, setClaimedIndexes] = useState([]);

  
const getDayHour = (timestamp) => {
  const now = new Date().getTime();
  const diffMs = timestamp - now;

  if (diffMs <= 0) return "0D 0H";

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) /
    (1000 * 60 * 60)
  );

  return `${days}D ${hours}H`;
};


  // ================= FETCH CYCLES =================
  const fetchCycles = async () => {
    if (!account || !contract) return;

    try {
      const userId = await contract.ids(account);
      const records = await contract.getUserCycles(userId);

      const formatted = records.map((record, i) => {
        const amount = ethers.formatEther(record.amount);

        const startedAt = Number(record.startedAt) * 1000;

        const cycleDays = Number(record.cycleDays);

        const roiTaken = Number(record.roiTaken);

        const cycleType = Number(record.cycleType);

        // SAME jQuery end time formula
        const endTime = startedAt + cycleDays * 24 * 60 * 60 * 1000;

        const percentage = (roiTaken / cycleDays) * 100;

        return {
          index: i,
          amount,
          startedAt,
          cycleDays,
          roiTaken,
          cycleType,
          endTime,
          percentage,
          principalClaimed: record.principalClaimed,
        };
      });

      setCycles(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCycles();
  }, [account, contract]);

  const getDate = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };

  const releaseCapital = async (index, type) => {
    if (!account) {
      toast.warning("Connect wallet first");
      return;
    }

    try {
      toast.info("Confirm transaction...");

      const gas = await contract.claimPrincipal.estimateGas(index, type);
      const tx = await contract.claimPrincipal(index, type, { gasLimit: gas });
      await tx.wait();

      // Mark this index as claimed
      setClaimedIndexes((prev) => [...prev, index]);

      // Optionally, update cycles state to reflect immediate UI change
      setCycles((prev) =>
        prev.map((cycle) =>
          cycle.index === index ? { ...cycle, roiTaken: -1 } : cycle,
        ),
      );

      toast.success(
        type === 0 ? "Principal Released Successfully" : "Reinvest Successful",
      );
    } catch (err) {
      console.error(err);
      toast.error(err?.reason || "Transaction Failed");
    }
  };

  return (
    <>
      <Header />

      <div className="container">
        <div className="headers">
          <h1 className="card-title">Your Cycles</h1>
          <div className="total-badge">
            <span>{cycles.length}</span> total
          </div>
        </div>

        <div className="mb-2">
          {!account && (
            <p style={{ textAlign: "center" }}>Please connect wallet</p>
          )}

          {loading && <p style={{ textAlign: "center" }}>Loading cycles...</p>}

          {!loading && account && cycles.length === 0 && (
            <p style={{ textAlign: "center" }}>No cycles found</p>
          )}

          {!loading &&
            cycles.map((cycle) => (
              <div key={cycle.index} className="card-content stat-card mb-2">
                {/* HEADER */}
                <div className="cycle-header">
                  <div className="cycle-amount-section">
                    <div className="cycle-label">Cycle Amount</div>
                    <div className="cycle-amount">${cycle.amount}</div>
                  </div>

                  <div
                    className={`status-badgee ${
                      cycle.roiTaken === cycle.cycleDays ? "completed" : ""
                    }`}
                  >
                    {cycle.roiTaken === cycle.cycleDays
                      ? "Completed"
                      : "Active"}
                  </div>
                </div>

                {/* DETAILS */}
                <div className="cycle-details">
                  <div className="detail-item">
                    <div className="detail-label">Cycle Type</div>
                    <div className="detail-value">
                      {cycle.cycleType === 0 ? "Invested" : "Compounded"}
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-label">ROI Token</div>
                    <div className="detail-value roi-token">
                      {cycle.roiTaken}/{cycle.cycleDays}
                    </div>
                  </div>

                  {cycle.roiTaken === cycle.cycleDays &&
                    !cycle.principalClaimed && (
                      <div className="detail-item">
                        <button
                          className="status-badge"
                          onClick={() => releaseCapital(cycle.index, 0)}
                        >
                          Release
                        </button>
                        <button
                          className="status-badge"
                          onClick={() => releaseCapital(cycle.index, 1)}
                        >
                          Reinvest
                        </button>
                      </div>
                    )}
                </div>

                {/* PROGRESS */}
                <div className="progress-section">
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${cycle.percentage}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="cycle-footer">
                  <div className="started-date">
                    Started: {getDate(cycle.startedAt)}
                  </div>

                  {cycle.roiTaken !== cycle.cycleDays && (
                    <div className="time-remaining">
                      {getDayHour(cycle.endTime)}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <BottomNav active="cycle" />
    </>
  );
};

export default CyclePage;
