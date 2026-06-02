import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "../context/Web3Context";

const formatCurrency = (value) =>
  Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const IncomeCapCard = () => {
  const { account, contract } = useWeb3();

  const [earnedAmount, setEarnedAmount] = useState(0);
  const [capAmount, setCapAmount] = useState(0);
  const [depositAmount, setDepositAmount] = useState(0);
  const [creditAmount, setCreditAmount] = useState(0);

  const loadData = async () => {
    try {
      if (!account || !contract) return;

      const userId = await contract.ids(account);
      if (Number(userId) === 0) return;
      const cycles = await contract.getUserCycles(userId);

      // REAL DEPOSIT (cycleType = 0)
      const realCycles = cycles.filter(
        (c) => c.isactive && Number(c.cycleType) === 0
      );

      // CREDIT INCOME (cycleType = 1)
      const creditCycles = cycles.filter(
        (c) => c.isactive && Number(c.cycleType) === 1
      );

      // TOTAL DEPOSIT
      const totalDeposit = realCycles.reduce((sum, c) => {
        return sum + Number(ethers.formatEther(c.amount));
      }, 0);

      // CREDIT EARNED (37.5 + 37.5)
      const creditEarned = creditCycles.reduce((sum, c) => {
        return sum + Number(ethers.formatEther(c.amount));
      }, 0);

      // REMAINING CAP FROM CONTRACT
      const remainingCap = Number(
        ethers.formatEther(await contract.maxPayoutOf(userId))
      );
      // TOTAL CAP (5x)
      const totalCap = totalDeposit * 5;

      // FINAL EARNED 
      const earned = totalCap - remainingCap + creditEarned;

   
      setDepositAmount(totalDeposit);
      setCreditAmount(creditEarned);
      setEarnedAmount(earned);
      setCapAmount(totalCap);

      //  DEBUG
      // console.log("REAL:", totalDeposit);
      // console.log("CREDIT:", creditEarned);
      // console.log("CAP:", totalCap);
      // console.log("REMAINING:", remainingCap);
      // console.log("EARNED:", earned);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, [account, contract]);

  const safeEarned = Math.max(0, earnedAmount);
  const safeCap = Math.max(0, capAmount);
  const progress =
    safeCap > 0 ? Math.min((safeEarned / safeCap) * 100, 100) : 0;
  const remaining = Math.max(safeCap - safeEarned, 0);

  return (
    <section className="income-cap-section">
      <div
        className="stat-card"
        style={{ "--income-cap-progress": `${progress}%` }}
      >
        {/* HEADER */}
        <div className="income-cap-header">
          <div>
            <h2 className="card-title">Income Cap</h2>
            <p>5X Earning Cap</p>
          </div>
        </div>

        {/* CENTER */}
        <div className="income-cap-meter">
          <div className="income-cap-center">
            <strong>{Math.round(progress)}%</strong>
            <p style={{ fontSize: "12px", opacity: 0.7 }}>
              Used
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="income-cap-footer">

          {/* <p>
            Earned: <strong>${formatCurrency(safeEarned)}</strong>
          </p> */}

          <p>
            Remaining: <strong>${formatCurrency(remaining)}</strong>
          </p>

          <p>
            Total Cap: <strong>${formatCurrency(safeCap)}</strong>
          </p>

          <small style={{ opacity: 0.7 }}>
            Deposit: ${formatCurrency(depositAmount)}
          </small>

          <br />

          {/* <small style={{ opacity: 0.7 }}>
            Credit Earned: ${formatCurrency(creditAmount)}
          </small> */}

        </div>
      </div>
    </section>
  );
};

export default IncomeCapCard;