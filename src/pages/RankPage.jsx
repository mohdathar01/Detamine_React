import { useEffect, useState } from "react";
import { CSpinner } from "@coreui/react";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import { useWeb3 } from "../context/Web3Context";
import { ethers } from "ethers";

const RankPage = () => {
  const { account, contract } = useWeb3();
  const [rankData, setRankData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!contract || !account) return;

    try {
      setLoading(true);

      //const id = Number(await contract.ids(account));
      const id =111111;
      if (!id) return;

      // USER INFO
      const user = await contract.userInfo(id);
      const totalTeam = Number(user.totalTeam);
      const currentRank = Number(user.rank);

      const ranks = [];

      // TOTAL 20 ranks (SC me defined)
      for (let i = 1; i <= 20; i++) {
        const rankInfo = await contract.map_ranks(i);

        const requiredTeam = Number(rankInfo.totalTeam);
        const reward = Number(ethers.formatEther(rankInfo.income));

        const progress = Math.min((totalTeam / requiredTeam) * 100, 100);

        const isOpen = currentRank >= i;

        ranks.push({
          rank: i,
          reward,
          requiredTeam,
          progress,
          isOpen,
        });
      }

      setRankData(ranks);
    } catch (err) {
      console.error("Rank Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [account, contract]);

  if (!account) {
    return <div className="center-screen"><h2>Connect Wallet</h2></div>;
  }

  if (loading) {
    return <div className="center-screen"><CSpinner /></div>;
  }

  return (
    <>
      <Header />

      <div className="container">
        <section className="section">
          <div className="main-card">
            <h2 className="card-title">Hash Rank Bonus</h2>

            {rankData.map((rank) => (
              <div key={rank.rank} className="level-item">
                
                <div className="level-header">
                  <div>
                    <p>Rank {rank.rank}</p>
                    <p>Reward: ${rank.reward}</p>
                  </div>

                  <span className={`status-badge ${rank.isOpen ? "bg-green" : "bg-yellow"}`}>
                    {rank.isOpen ? "OPEN" : "LOCKED"}
                  </span>
                </div>

                <div className="progress-group">
                  <div className="progress-label">
                    <span>Team</span>
                    <span>{rank.progress.toFixed(0)}%</span>
                  </div>

                  <div className="progress-bar-wrapper">
                    <div
                      className="progress-bar orange"
                      style={{ width: `${rank.progress}%` }}
                    />
                  </div>

                  <p style={{ marginTop: "5px" }}>
                    {rank.requiredTeam} Team Required
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <BottomNav active="rank" />
    </>
  );
};

export default RankPage;