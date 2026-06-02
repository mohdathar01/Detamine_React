
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import BottomNav from "../components/layout/BottomNav";
import { useWeb3 } from "../context/Web3Context";
import "../styles/dashboard.css";
import "../styles/styles.css";
import { toast } from "react-toastify";

import {
  CONTRACT_ADDRESS,
  USDT_ADDRESS,
  ABI,
  USDTABI,
} from "../components/web3/config";
import Packages from "../components/packages";
import CompoundBaseCard from "../components/CompoundBaseCard";
import IncomeCapCard from "../components/IncomeCapCard";
import { SpokeLoader } from "../components/Spokeloader";

const Dashboard = () => {
  const { account, contract } = useWeb3();
  const navigate = useNavigate();

  const [userId, setUserId] = useState(0);
  const [joinedDate, setJoinedDate] = useState("-");
  const [referredBy, setReferredBy] = useState("-");
  const [todayIncome, setTodayIncome] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [roiIncome, setRoiIncome] = useState(0);
  const [totalTeam, setTotalTeam] = useState(0);
  const [totalBusiness, setTotalBusiness] = useState(0);
  const [directBusiness, setDirectBusiness] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [referralLink, setReferralLink] = useState("");
  const [incomeHistory, setIncomeHistory] = useState([]);
  const [depositLoading, setDepositLoading] = useState(false);
  const [claimLoading, setClaimLoading] = useState(false);
  const [totalLost, setTotalLost] = useState(0);
  const [todayLost, setTodayLost] = useState(0);
  const [depositInvestment, setdepositInvestment] = useState(0);
  const [showRoiWallet, setShowRoiWallet] = useState(false);
  const [currentDepositsofuser, setCurrentDepositofuser] = useState(0);
  const [todayTeam, setTodayTeam] = useState(0);
  const [todayBusiness, setTodayBusiness] = useState(0);
  const [depositAmount, setDepositAmount] = useState("");
  const [showDeposit, setShowDeposit] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [newIncomeLength, setnewIncomeLength] = useState(0);
  const [userUSDTBalance, setUserUSDTBalance] = useState(0);
  const [userBNBBalance, setUserBNBBalance] = useState(0);
  const [spage, setSpage] = useState(0); // UI page (jQuery style)
  // const [totalPagesRecords, settotalPagesRecords] = useState(0);



//globally declared dont set using usestate
  const limit = 10;
  const totalPages = totalRecords > 0
    ? Math.ceil(totalRecords / limit)
    : 0;


  // ================= FETCH DASHBOARD =================
  const fetchDashboard = async () => {

    if (!account || !contract) return;

    try {
      // const rawId = await contract.ids(account);
        const rawId=111111;
      const id = Number(rawId);
      console.log("id is ",id);

      if (!id) {
        navigate("/signup");
        return;
      }

      setUserId(id);

      // 🔥 FIX: remove duplicate income length logic here
      const incomeLength = Number(
        await contract.getIncomeHistoryLength(id)
      );
      setnewIncomeLength(incomeLength);

      const income = await contract.incomeInfo(id);
      setTotalIncome(Number(ethers.formatEther(income[0] ?? 0n)));
      setTotalLost(Number(ethers.formatEther(income[1] ?? 0n)));

      const today = await contract.getCurDay();
      console.log("getcurrent day",today);
      const [dayIncomeRaw, dayLostRaw, dayTeams, dayBusiness] =
        await Promise.all([
          contract.dayIncome(id, today),
          contract.dayLost(id, today),
          contract.dayTeams(id, today),
          contract.dayBusiness(id, today),
        ]);
   console.log(dayIncomeRaw);
      setTodayIncome(Number(ethers.formatEther(dayIncomeRaw ?? 0n)));
      setTodayLost(Number(ethers.formatEther(dayLostRaw ?? 0n)));
      setTodayTeam(Number(dayTeams ?? 0n)); // 🔥 FIX
      setTodayBusiness(Number(ethers.formatEther(dayBusiness ?? 0n)));

      const cycles = await contract.getUserCycles(id);
      let claimroi = 0;
      const dayTime = 86400;
      const nowTime = Date.now() / 1000;

      cycles.forEach((cycle) => {
        if (Number(cycle.roiTaken) < Number(cycle.cycleDays)) {
          const period = (nowTime - Number(cycle.lastClaimed)) / dayTime;
          const amount = Number(ethers.formatEther(cycle.amount ?? 0n));
          claimroi += (amount * 3.33 * period) / 100;
        }
      });

      setRoiIncome(claimroi);

      const userInfo = await contract.userInfo(id);
      const timestamp = Number(userInfo[2]); // seconds from contract
      const now = Math.floor(Date.now() / 1000); // current time in seconds

      const diffSeconds = now - timestamp;

      const days = Math.floor(diffSeconds / (60 * 60 * 24));
      const hours = Math.floor((diffSeconds % (60 * 60 * 24)) / (60 * 60));

      setJoinedDate(`${days}D ${hours}H`);

      setReferredBy(Number(userInfo[3] ?? 0n));
      // setJoinedDate(new Date(Number(userInfo[2]) * 1000).toLocaleDateString());
      setTotalTeam(Number(userInfo[12] ?? 0n));  //join total team
      setdepositInvestment(Number(ethers.formatEther(userInfo[4] ?? 0n)));
      setTotalBusiness(Number(ethers.formatEther(userInfo[8] ?? 0n)));
      setDirectBusiness(Number(ethers.formatEther(userInfo[9] ?? 0n)));
      setCurrentDepositofuser(Number(ethers.formatEther(userInfo[5] ?? 0n)));

      const cycle = await contract.getActiveCycle(id);
      setTotalDeposit(Number(ethers.formatEther(cycle ?? 0n)));

      setReferralLink(`${window.location.origin}/signup#ref=${id}`);
    } catch (err) {
      console.log("Dashboard Error:", err);
    }
  };





  // 🔥 FIX: ONLY ONE LENGTH EFFECT
  useEffect(() => {
    if (!contract || !userId) return;

    const loadIncome = async () => {
      const total = newIncomeLength;

      if (total === 0) {
        setIncomeHistory([]);
        setTotalRecords(0);
        setPage(0);
        setSpage(0);
        return;
      }

      const limit = 10;

      // 🔥 jQuery same logic
      let lastPage = Math.floor(total / limit);
      if (total % limit === 0) {
        lastPage = lastPage - 1;
      }

      setPage(lastPage);   // contract page
      setSpage(0);         // UI page start 1
      setTotalRecords(total);

      getIncomeInfo(lastPage, userId, 0);
    };

    loadIncome();
  }, [newIncomeLength]);

//useEffect for income info 
  useEffect(() => {
    if (showIncomeModal) {
      getIncomeInfo();
    }
  }, [showIncomeModal]);



//get income info fn 
  const getIncomeInfo = async (direction) => {
    if (!contract || !userId) return;

    try {
      const limit = 10;
      // total length from contract
      const total = await contract.getIncomeHistoryLength(userId);
      const totalNum = Number(total);

      setTotalRecords(totalNum);

      if (totalNum === 0) {
        setIncomeHistory([]);
        return;
      }
      const totalPages = Math.ceil(totalNum / limit);
      let newUiPage = spage;

      if (direction === "next" && spage < totalPages - 1) {
        newUiPage = spage + 1;
      }
      else if (direction === "back" && spage > 0) {
        newUiPage = spage - 1;
      }

      //  Safe reverse mapping (never negative)
      const contractPage = Math.max(0, totalPages - 1 - newUiPage);

      const response = await contract.getIncomeHistoryPaged(
        userId,
        contractPage,
        limit
      );

      const records = Array.from(response[0] || []);

      const pkgname = [
  "Hash ROI Bonus",                    // 0
  "Hash Level Share Bonus",           // 1
  "Hash Spark Bonus",                 // 2
  "Hash Generational Royalty Bonus",  // 3
  "Hash Rank Bonus",                  // 4
  "Hash Credit Bonus",                // 5  
];

      const startSr = newUiPage * limit + 1;

      const formatted = [...records]
        .reverse()
        .map((item, index) => ({
          sr: startSr + index,
          type: pkgname[Number(item[0])] || `Type ${Number(item[0])}`,
          amount: ethers.formatUnits(item[1], 18),
          time: Number(item[4]) > 0
            ? new Date(Number(item[4]) * 1000).toLocaleString()
            : "N/A",
          from: item[3],
          level: item[4],
          isLost: item[5],
        }));

      setIncomeHistory(formatted);
      setSpage(newUiPage);

    } catch (err) {
      console.error("Income Error:", err);
    }
  };


//this will work for fwtch dashboard
  useEffect(() => {
    if (!account || !contract) return;
    fetchDashboard();
  }, [account, contract]);




//claim roi using claim roi button 
  //  STEP 2 — Your claimRoi stays clean, no JSX inside it
const claimRoi = async () => {
  if (!contract) return;

  try {
    setClaimLoading(true);   // ← this triggers the loader to appear in JSX above

    const tx = await contract.claimRoi();
    await tx.wait();

    toast.success("Claim Successful ✅", {
      style: { background: "#16a34a", color: "#fff" },
    });

    await fetchDashboard();

  } catch (err) {
    console.error("❌ Claim Error:", err);

    const message =
      err?.reason ||
      err?.data?.message ||
      err?.message ||
      "Claim failed ❌";

    toast.error(message);

  } finally {
    setClaimLoading(false);  // ← this makes the loader disappear (success OR error)
  }
};

// to copy the refferal link 
  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      // alert("Referral link copied ✅");
    } catch (err) {
      // console.log("Copy failed", err);
    }
  };

  //usdt and native balance fetch 
  const fetchBalances = async () => {
    if (!account) return;

    const provider = new ethers.BrowserProvider(window.ethereum);

    // BNB Balance
    const balance = await provider.getBalance(account);
    setUserBNBBalance(ethers.formatEther(balance));

    // USDT Balance
    const signer = await provider.getSigner();
    const usdt = new ethers.Contract(USDT_ADDRESS, USDTABI, signer);

    const decimals = await usdt.decimals();
    const usdtBalance = await usdt.balanceOf(account);

    setUserUSDTBalance(
      ethers.formatUnits(usdtBalance, decimals)
    );
  };


  //this is used for fetch balance fn 
  useEffect(() => {
    if (showDeposit) {
      fetchBalances();
    }
  }, [showDeposit]);


  //when account(0) not found then it will show
  if (!account)
    return (
      <div className="center-screen">
        <h2>Please connect wallet</h2>
      </div>
    );
  return (
    <>
      <Header userId={userId} />

      <div className="container">
        {/* HEADER */}
        <section className="section">
          <div className="card-highlight header-card stat-card">
            <h1 className="card-title">Dashboard</h1>
            {/* <p>
              Welcome back, <span className="user-id">{userId}</span>
            </p> */}
          </div>
        </section>

        {/* JOIN INFO */}
        <section className="section">
          <div className="stat-card info-bar">
            <div className="info-item">
              <span className="label">Joined Since:</span>
              <span className="value">{"⏱" + joinedDate}</span>
            </div>
            <div className="mytext"> | </div>
            <div className="info-item right">
              <span className="label">Referred By:</span>
              <span className="value">{"👤" + referredBy}</span>
            </div>
          </div>
        </section>
 {/* REFERRAL */}
        <section className="section">
          <div className="stat-card referral-card">
            <div className="content-header">
              <div className="icon-box-large">
                <svg
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" x2="15.42" y1="13.51" y2="17.49"></line>
                  <line x1="15.41" x2="8.59" y1="6.51" y2="10.49"></line>
                </svg>
              </div>

              <div className="content-title">
                <h3 className="stat-subtext red">Your Referral Link</h3>
                <p>Invite friends & grow your team</p>
              </div>
            </div>

            {currentDepositsofuser > 0 ? (
              <button
                className="btn btn-primary"
                onClick={copyText}
                style={{ width: "100%" }}
              >
                Copy
              </button>
            ) : (
              <p className="content-text">
                Please Make a deposit to get Refer Link.
              </p>
            )}

            <p className="content-note">
              Share this link to earn referral rewards automatically.
            </p>
          </div>
        </section>

        {/* STATS */}
        {/* STATS */}
        <section className="section">
          <div className="stats-grid">
            {/* Today's Income */}
            <div className="stat-card">
              <div className="stat-header">
                <div className="fordsplflex">
                  <span className="mytext">Today's Income</span>
                </div>
                <div className="icon-box">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                  </svg>
                </div>
              </div>

              <div className="stat-value orange">${todayIncome.toFixed(3)}</div>

              <div className="stat-subtext red">
                <div>Lost Income: {todayLost.toFixed(2)}</div>
              </div>
            </div>

            {/* Total Income */}
            <div className="stat-card">
              <div className="stat-header">
                <div className="fordsplflex">
                  <span className="mytext">Total Income</span>
                </div>
                <div className="icon-box">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 7h6v6"></path>
                    <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                  </svg>
                </div>
              </div>
              <div className="stat-value white">${totalIncome.toFixed(3)}</div>

              <div className="stat-subtext red">
                <div>Lost Income: {totalLost.toFixed(2)}</div>
              </div>
            </div>

            {/* Total Team */}
            <div className="stat-card">
              <div className="stat-header">
                <div className="fordsplflex">
                  <span className="mytext">Total Team</span>
                </div>
                <div className="icon-box">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                  </svg>
                </div>
              </div>
              <div className="stat-value amber">{totalTeam}</div>

              <div className="stat-subtext lime">
                Today: <span id="todaymyteam">{todayTeam}</span>
              </div>
            </div>

            {/* Total Business */}
            <div className="stat-card ">
              <div className="stat-header">
                <div className="fordsplflex">
                  <span className="mytext">Total Business</span>
                </div>
                <div className="icon-box">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                  </svg>
                </div>
              </div>
              <div className="stat-value orange-light">
                ${totalBusiness.toFixed(2)}
              </div>

              <div className="stat-subtext lime">
                Today: $<span id="today_business">{todayBusiness}</span>
              </div>
            </div>

            {/* My Investment */}
            <div className="stat-card">
              <div className="stat-header">
                <div className="fordsplflex">
                  <span className="mytext">My Investment</span>
                </div>
                <div className="icon-box">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                  </svg>
                </div>
              </div>
              <div className="stat-value orange-light">
                ${depositInvestment.toFixed(2)}
              </div>
            </div>

            {/* Direct Business */}
            <div className="stat-card">
              <div className="stat-header">
                <div className="fordsplflex">
                  <span className="mytext">Direct Business</span>
                </div>
                <div className="icon-box">
                  <svg
                    className="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                  </svg>
                </div>
              </div>
              <div className="stat-value orange-light">
                ${directBusiness.toFixed(2)}
              </div>
            </div>
          </div>
        </section>


    
        {/* BUTTONS */}
        <section className="section">
          <div className="">
            {!showRoiWallet ? (
              <>
                {/* Deposit Button */}
                {/* <button
                  className="btn btn-primary"
                  onClick={() => setShowDeposit(true)}
                >
                  Deposit
                </button> */}

                <button
                  className="btn btn-primary w-full"
                  onClick={() => navigate("/wallet")}
                >
                  Withdraw
                </button>
              </>
            ) : (
              /* ROI WALLET CARD */
              <div className="roi-wallet-card">
                <div className="wallet-header">
                  <h3>ROI WALLET</h3>
                  <div>ROI Income: {roiIncome.toFixed(4)}</div>
                </div>
                <div className="wallet-buttons"></div>

                <button
                  className="back-btn"
                  onClick={() => setShowRoiWallet(false)}
                >
                  ← Back
                </button>
              </div>
            )}
          </div>
        </section>
       
        {/* ACTIVE CYCLE */}
        <section className="section">
          <div className="stat-card">
            <div className="content-header">
              <div className="icon-box-large">
                <svg
                  className="icon"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                  <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                  <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                </svg>
              </div>
              <div className="content-title">
                <h3 className="stat-subtext red"> Hash Rent Bonus</h3>
                <p>Your running earning cycles</p>
              </div>
            </div>

            <div className="cycles-grid">
              <div className="cycle-box">
                <p>Hash Rent</p>
                {/* <p className="white">${totalDeposit.toFixed(2)}</p> */}
                <p className="white">0.6%</p>
              </div>
              
              <div className="cycle-box">
                
                <p>Claimable Rent</p>
                <p className="orange">${roiIncome.toFixed(4)}</p>
              </div>
            </div>
            {claimLoading && 
            <div className="d-flex justify-content-center gap-2 w-100">  <SpokeLoader message="Processing Mine..." /> 
            </div> }
            <button className="btn-claim" onClick={claimRoi} disabled={claimLoading}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="8" cy="8" r="6"></circle>
                  <path d="M18.09 10.37A6 6 0 1 1 10.34 18"></path>
                  <path d="M7 6h1v4"></path>
                  <path d="m16.71 13.88.7.71-2.82 2.82"></path>
                </svg>
               Start Mining
              </span>
            </button>
          </div>
        </section>
{/* PACKAGES */}
<Packages/>
<CompoundBaseCard />
<IncomeCapCard earnedAmount={60} capAmount={depositInvestment * 2} />

        {/* INCOME HISTORY */}

        <section className="section">
          <div className="stat-card">
            <div className="history-header">
              <h2 className="card-title">Income History</h2>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setShowIncomeModal(true);
                  getIncomeInfo();   // 🔥 yaha call karo
                }}
              >
                View All
              </button>
            </div>

            <div className="income-list">
              {incomeHistory.length === 0 ? (
                <div className="no-record">No Records Found</div>
              ) : (
                incomeHistory.slice(0, 10).map((item, i) => (
                  <div className="income-card" key={i}>
                    <div className="income-bar"></div>

                    <div className="income-body">
                      <div className="income-left">
                        <div className="income-title">{item.type}</div>
                        <div className="income-sub">
                          <div className="income-center">{item.time}</div>
                        </div>
                      </div>

                      <div className="income-right">
                        ${Number(item.amount).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ================= MODAL ================= */}
          {showIncomeModal && (
            <section className="i-modal section">
              <div
                className="container"
                style={{
                  background: "#0f172a",
                  padding: "20px",
                  borderRadius: "10px",
                  maxHeight: "90vh",
                  overflowY: "auto",
                }}
              >
                <div className="stat-card" style={{ position: "relative" }}>
                  <h2
                    style={{
                      marginBottom: "15px",
                      color: "#ffffff",
                      fontSize: "1.5rem",
                    }}
                  >
                    MY INCOME
                  </h2>

                  {/* CLOSE BUTTON */}
                  <button
                    onClick={() => setShowIncomeModal(false)}
                    className="btn btn-primary abs-btn"
                    style={{
                      width: "30%",
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                    }}
                  >
                    X
                  </button>

                  {/* TABLE */}
                  <div style={{ width: "100%", overflowX: "auto" }}>
                    <table
                      style={{
                        width: "100%",
                        fontSize: "13px",
                        lineHeight: "2",
                      }}
                    >
                      <thead>
                        <tr style={{ color: "#ff6600", textAlign: "left" }}>
                          <th>SR.NO.</th>
                          <th>INCOME TYPE</th>
                          <th>AMOUNT</th>
                          <th>TIME</th>
                          <th>LEVEL</th>
                          <th>FROM</th>
                        </tr>
                      </thead>

                      <tbody>
                        {incomeHistory.length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ padding: "10px" }}>
                              No Records Found
                            </td>
                          </tr>
                        ) : (
                          incomeHistory.map((item, i) => (
                            <tr key={i}>
                              <td style={{ padding: "8px" }}>{item.sr}</td>
                              <td style={{ padding: "8px" }}>{item.type}</td>
                              <td style={{ padding: "8px" }}>
                                ${Number(item.amount).toFixed(3)}
                              </td>
                              <td style={{ padding: "8px" }}>{item.time}</td>
                              <td style={{ padding: "8px" }}>{item.from}</td>
                              <td style={{ padding: "8px" }}>{item.level}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>


                  <div
                    style={{
                      marginTop: "20px",
                      marginBottom: "35px",
                      textAlign: "center",
                      color: "#fff",
                    }}
                  >
                    {/* Total Records */}
                    <div style={{ marginBottom: "15px", fontWeight: "500" }}>
                      Total Records: {totalRecords}
                    </div>

                    {/* Pagination Controls */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "20px",
                      }}
                    >
                      <button
                        onClick={() => getIncomeInfo("back")}
                        disabled={spage === 0}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          background: "rgba(29, 34, 59, 0.6)",
                          color: "rgba(253, 253, 255, 0.6)"
                        }}
                      >
                        ← Prev
                      </button>

                      <span style={{ fontWeight: "500" }}>
                        Page {spage + 1}
                      </span>

                      <button
                        onClick={() => getIncomeInfo("next")}
                        disabled={spage >= totalPages - 1}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          background: "rgba(29, 34, 59, 0.6)",
                          color: "rgba(250, 250, 253, 0.6)"
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <div className="footer-content" style={{ textAlign: "center", marginTop: "20px" }}>
            <a
              href="https://t.me/prohash_official"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginRight: "50px" }}
            >
              🏛 Official Channel
            </a>

            <a
              href="https://t.me/prohash_support"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              🦹 Support Team
            </a>
          </div>
        </section>

      </div>

      {/* FOOTER NAV */}
      <BottomNav active="dashboard" />


    </>
  );
};

export default Dashboard;
