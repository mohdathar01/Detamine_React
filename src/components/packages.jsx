import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3 } from "../context/Web3Context";

const Packages = () => {
  const { account, contract, usdtContract } = useWeb3();
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userLevel, setUserLevel] = useState(0);

  const data = [1, 25, 50, 125, 225];

  // checking user level
  const loadUserLevel = async () => {
    try {
      if (!account || !contract) return;

      const id = await contract.ids(account);
      if (Number(id) === 0) return;

      const info = await contract.incomeInfo(id);
      setUserLevel(Number(info.level));
      console.log(info.level);
    } catch (err) {
      console.log("Level Error:", err);
    }
  };

  useEffect(() => {
    loadUserLevel();
  }, [account, contract]);

   
  const handleBuy = async () => {
    try {
      if (selected === null) {
        alert("Select package first");
        return;
      }

      if (!account || !contract || !usdtContract) {
        alert("Connect wallet");
        return;
      }

      const level = selected + 1;

      // only 225 package bought multiple times 
      if (level <= userLevel && level !== 5) {
        alert("Already purchased ❌");
        return;
      }

      setLoading(true);

      // prices (same as contract)
      const prices = [
        ethers.parseEther("1"),
        ethers.parseEther("25"),
        ethers.parseEther("50"),
        ethers.parseEther("125"),
        ethers.parseEther("225"),
      ];

      const amount = prices[selected];

     
      const allowance = await usdtContract.allowance(
        account,
        contract.target
      );

      if (allowance < amount) {
        const tx1 = await usdtContract.approve(contract.target, amount);
        await tx1.wait();
      }

       
      const tx2 = await contract.deposit(account, level);
      await tx2.wait();

      alert("Deposit Successful ✅");

      setSelected(null);
      await loadUserLevel(); // refresh level
    } catch (err) {
      console.log(err);
      alert(err?.reason || err?.message || "Transaction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="packages-section mb-3">
      <h2 className="card-title">HASH PACKAGES</h2>

      <div className="main-card mt-3">
        <div className="packages">
          {data.map((price, index) => {
            const level = index + 1;

            // ❗ disable logic
            const isDisabled =
              level <= userLevel && level !== 5;

            return (
              <div
                key={index}
                className={`stat-card 
                  ${selected === index ? "active" : ""} 
                  ${isDisabled ? "disabled" : ""}
                `}
                onClick={() => {
                  if (!isDisabled) setSelected(index);
                }}
                style={{
                  opacity: isDisabled ? 0.5 : 1,
                  cursor: isDisabled ? "not-allowed" : "pointer",
                  position: "relative",
                }}
              >
                ${price}

                {/* 🔥 Purchased Tag */}
                {isDisabled && (
                  <span
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      fontSize: "10px",
                      background: "red",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    Purchased
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn btn-primary"
            onClick={handleBuy}
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Packages;