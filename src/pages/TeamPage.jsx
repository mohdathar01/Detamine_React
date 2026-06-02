import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CSpinner } from "@coreui/react";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import { useWeb3 } from "../context/Web3Context";
import "../styles/dashboard.css";
import "../styles/styles.css";

const TeamPage = () => {
  const { account, contract } = useWeb3();

  const [userId, setUserId] = useState(null);
  const [teamLength, setTeamLength] = useState([]);
  const [teamUsers, setTeamUsers] = useState([]);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState(null);

  const fetchData = async () => {
    if (!contract || !account) return;

    try {
      setLoading(true);

       //const id = Number(await contract.ids(account));
      const id =111111;
      if (!id) return;

      setUserId(id);

      // 🔥 SC returns uint[20]
      const teamLengths = await contract.getUserTeamsLength(id);

      setTeamLength(teamLengths.map((v) => Number(v)));
    } catch (err) {
      console.error("Team Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [account, contract]);

  const getTeamInfo = async (layer) => {
    if (!contract || !userId) return;

    try {
      setLoading(true);

      // 🔥 layer index SC me 0-based hai
      const records = await contract.getTeamUsers(userId, layer - 1);

      const formatted = records.map((item) => ({
        id: Number(item.id),
        deposit: Number(ethers.formatEther(item.currentDeposit || 0n)),
        joinedAt: new Date(Number(item.joinedAt) * 1000).toLocaleString(),
        directTeam: Number(item.directTeam),
        directBusiness: Number(ethers.formatEther(item.directBusiness || 0n)),
        totalBusiness: Number(ethers.formatEther(item.totalBusiness || 0n)),
      }));

      setTeamUsers(formatted);
    } catch (err) {
      console.error("Team Layer Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div className="center-screen">
        <h2>Please connect wallet</h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="center-screen">
        <CSpinner />
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="container">
        <section className="section">
          <h2 className="card-title">My Team Structure</h2>

          <div className="main-card">
            <div className="team-list">

              {/* 🔥 FIX: only 20 layers */}
              {Array.from({ length: 20 }, (_, i) => i + 1).map((layer) => (
                <div key={layer} className="team-item">
                  <div className="team-info">
                    <div className="layer-badge">{layer}</div>

                    <div className="layer-details">
                      <p>Layer {layer}</p>
                      <p>{teamLength[layer - 1] || 0} members</p>
                    </div>
                  </div>

                  <button
                    className="view-btn"
                    onClick={async () => {
                      await getTeamInfo(layer);
                      setSelectedLayer(layer);
                      setShowTeamModal(true);
                    }}
                  >
                    View
                  </button>
                </div>
              ))}

            </div>
          </div>
        </section>

        {/* 🔥 MODAL */}
        {showTeamModal && (
          <section className="section i-modal">
            <div className="container">
              <div className="main-card">

                <h3 className="card-title">
                  Level {selectedLayer} Team
                </h3>

                <div className="overflow-auto">
                  <table style={{ width: "100%", minWidth: "900px" }}>
                    <thead>
                      <tr>
                        <th>UserId</th>
                        <th>Deposit</th>
                        <th>Time</th>
                        <th>Direct Team</th>
                        <th>Direct Business</th>
                        <th>Total Business</th>
                      </tr>
                    </thead>

                    <tbody>
                      {teamUsers.length === 0 ? (
                        <tr>
                          <td colSpan="6">No Records Found</td>
                        </tr>
                      ) : (
                        teamUsers.map((user, i) => (
                          <tr key={i}>
                            <td>{user.id}</td>
                            <td>${user.deposit.toFixed(2)}</td>
                            <td>{user.joinedAt}</td>
                            <td>{user.directTeam}</td>
                            <td>${user.directBusiness.toFixed(2)}</td>
                            <td>${user.totalBusiness.toFixed(2)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  <br />

                  <button
                    className="btn btn-primary"
                    onClick={() => setShowTeamModal(false)}
                  >
                    Back
                  </button>

                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <BottomNav active="team" />
    </>
  );
};

export default TeamPage;