 

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import { useWeb3 } from "../context/Web3Context";
import { toast } from "react-toastify";

const WalletPage = () => {
  const { account, contract, connectWallet } = useWeb3();

  const [withdrawable, setWithdrawable] = useState(0);

  const [totalRoi, setTotalRoi] = useState(0);
  const [totalLevel, setTotalLevel] = useState(0);
  const [totalRank, setTotalRank] = useState(0);
  const [totalRoyalty, setTotalRoyalty] = useState(0);

  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  const fetchIncome = async () => {
    if (!contract || !account) return;

    try {
      setLoading(true);

      const id = Number(await contract.ids(account));
      //const id=111111;
      if (!id) {
        toast.warning("User not registered");
        return;
      }

      const data = await contract.incomeInfo(id);

      const totalIncome = Number(ethers.formatEther(data.totalIncome));
      const totalWithdraw = Number(ethers.formatEther(data.totalWithdraw));

      // 🔥 MAIN BALANCE
      const available = totalIncome - totalWithdraw;
      setWithdrawable(available > 0 ? available : 0);

      // 🔥 BREAKDOWN
      setTotalRoi(Number(ethers.formatEther(data.totalReward)));
      setTotalLevel(Number(ethers.formatEther(data.totalLevelIncome)));
      setTotalRank(Number(ethers.formatEther(data.totalRankIncome)));
      setTotalRoyalty(Number(ethers.formatEther(data.totalRoyaltyIncome)));

    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch income");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, [account, contract]);

  // ================= WITHDRAW =================
  const handleWithdraw = async () => {
    if (!account) return toast.error("Connect wallet first");

    if (!amount || Number(amount) <= 0)
      return toast.warning("Enter valid amount");

    if (Number(amount) < 5)
      return toast.warning("Minimum withdraw is $5");

    if (Number(amount) > withdrawable)
      return toast.error("Insufficient balance");

    try {
      setLoading(true);

      const tx = await contract.withdrawNetworkReward(
        ethers.parseEther(amount)
      );

      await tx.wait();

      toast.success("Withdraw Successful ✅");
      setAmount("");
      fetchIncome();

    } catch (err) {
      console.error(err);
      toast.error(err?.reason || "Transaction Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="container">

        {!account && (
          <div className="main-card" style={{ textAlign: "center" }}>
            <button className="btn btn-primary" onClick={connectWallet}>
              Connect Wallet
            </button>
          </div>
        )}

        {loading && (
          <div className="main-card" style={{ textAlign: "center" }}>
            Processing...
          </div>
        )}

        {account && (
          <>
            {/* 🔥 INCOME OVERVIEW */}
            <div className="stat-card mb-2">
              <p className="section-title">Earnings Overview</p>

              <div className="grid">
                <div className="mini-card">
                  <span>ROI Income</span>
                  <strong>${totalRoi.toFixed(2)}</strong>
                </div>

                <div className="mini-card">
                  <span>Level Income</span>
                  <strong>${totalLevel.toFixed(2)}</strong>
                </div>

                <div className="mini-card">
                  <span>Rank Income</span>
                  <strong>${totalRank.toFixed(2)}</strong>
                </div>

                <div className="mini-card">
                  <span>Royalty Income</span>
                  <strong>${totalRoyalty.toFixed(2)}</strong>
                </div>
              </div>
            </div>

            {/* 🔥 WITHDRAW CARD */}
            <div className="stat-card mb-2">
              <h3 className="card-title">Withdraw Balance</h3>

              <h4>
                Balance: <b>${withdrawable.toFixed(3)}</b>
              </h4>

              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <button
                className="btn-primary"
                onClick={handleWithdraw}
                disabled={loading}
              >
                {loading ? "Processing..." : "Withdraw"}
              </button>
            </div>
          </>
        )}
      </div>

      <BottomNav active="wallet" />
    </>
  );
};

export default WalletPage;