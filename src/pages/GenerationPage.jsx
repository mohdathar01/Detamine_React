import { useEffect, useState } from "react";
import { CSpinner } from "@coreui/react";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import { useWeb3 } from "../context/Web3Context";
import "../styles/dashboard.css";
import "../styles/styles.css";

const generationRanks = [
  { name: "STORM", team: 3, royalty: "X" },
  { name: "NOVA", team: 9, royalty: "X" },
  { name: "TITAN", team: 27, royalty: "3%" },
  { name: "ZENITH", team: 81, royalty: "5%" },
  { name: "BLAZE", team: 243, royalty: "7%" },
  { name: "PHANTOM", team: 729, royalty: "9%" },
  { name: "SOLAR", team: 2187, royalty: "11%" },
  { name: "LUNAR", team: 6561, royalty: "13%" },
  { name: "VORTEX", team: 19683, royalty: "17%" },
  { name: "SPECTER", team: 59049, royalty: "20%" },
];

const GenerationPage = () => {
  const { account, contract } = useWeb3();

  const [teamData, setTeamData] = useState({
    maxTeam: 0,
    otherTeam: 0,
    totalTeam: 0,
  });

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!contract || !account) return;

    try {
      setLoading(true);

      const id = Number(await contract.ids(account));
      if (!id) return;

      //  REAL CONTRACT DATA
      const [maxTeam, otherTeam, total] =
        await contract.getTeamDeposit(id);

      setTeamData({
        maxTeam: Number(maxTeam),
        otherTeam: Number(otherTeam),
        totalTeam: Number(total),
      });

    } catch (err) {
      console.error("Generation Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [account, contract]);

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
          <div className="main-card">
            <div>
              <h2 className="card-title">
                Hash Generational Royalty Bonus
              </h2>
              <span className="progress-label">
                40% Strong Leg | 60% Other Team
              </span>
            </div>

            <div className="generation-rank-grid">
              {generationRanks.map((rank) => {
                const progressStrong = Math.min(
                  (teamData.maxTeam / rank.team) * 100,
                  100
                );

                const progressOther = Math.min(
                  (teamData.otherTeam / rank.team) * 100,
                  100
                );

                const isOpen =
                  teamData.maxTeam >= rank.team &&
                  teamData.otherTeam >= rank.team;

                return (
                  <div
                    key={rank.name}
                    className={`generation-rank-card ${
                      isOpen ? "open" : ""
                    }`}
                  >
                    <div className="generation-rank-top">
                      <h3>{rank.name}</h3>
                      <span
                        className={`status-badge ${
                          isOpen ? "bg-green" : "bg-yellow"
                        }`}
                      >
                        {isOpen ? "OPEN" : "LOCKED"}
                      </span>
                    </div>

                    <div className="generation-rank-values">
                      <div>
                        <span>Required</span>
                        <strong>{rank.team}</strong>
                      </div>
                      <div>
                        <span>Royalty</span>
                        <strong>{rank.royalty}</strong>
                      </div>
                    </div>

                    {/* 🔥 STRONG LEG */}
                    <div className="progress-group">
                      <div className="progress-label">
                        <span>Strong Leg</span>
                        <span>
                          {teamData.maxTeam}/{rank.team}
                        </span>
                      </div>
                      <div className="progress-bar-wrapper">
                        <div
                          className="progress-bar green"
                          style={{ width: `${progressStrong}%` }}
                        />
                      </div>
                    </div>

                    {/* 🔥 OTHER TEAM */}
                    <div className="progress-group">
                      <div className="progress-label">
                        <span>Other Team</span>
                        <span>
                          {teamData.otherTeam}/{rank.team}
                        </span>
                      </div>
                      <div className="progress-bar-wrapper">
                        <div
                          className="progress-bar orange"
                          style={{ width: `${progressOther}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <BottomNav active="generation" />
    </>
  );
};

export default GenerationPage;