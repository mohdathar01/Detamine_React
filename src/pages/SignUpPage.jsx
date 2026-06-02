import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import AuthLayout from "./AuthPage";
import { toast } from "react-toastify";
import { ethers } from "ethers";

// ✅ CONFIG IMPORT
import {
  CONTRACT_ADDRESS,
  USDT_ADDRESS,
  ABI,
  USDTABI,
} from "../components/web3/config";

const DEFAULT_ID = "111111";

const SignUpPage = () => {
  const navigate = useNavigate();
  const { account, connectWallet, contract, signer } = useWeb3();

  const [upline, setUpline] = useState(DEFAULT_ID);
  const [loading, setLoading] = useState(false);

  // =========================
  // 🔥 REFERRAL LOGIC (CLEAN)
  // =========================
  useEffect(() => {
    try {
      const hash = window.location.hash;
      const refMatch = hash.match(/ref=([0-9]+)/i);

      if (refMatch && refMatch[1]) {
        setUpline(refMatch[1]);
      } else {
        setUpline(DEFAULT_ID);
      }
    } catch (err) {
      console.error("Ref parse error:", err);
      setUpline(DEFAULT_ID);
    }
  }, []);

  // =========================
  // 🔥 SIGNUP FUNCTION
  // =========================
  const signup = async () => {
    try {
      setLoading(true);

      let walletData;

      // 🔌 Wallet connect
      if (!account || !contract || !signer) {
        walletData = await connectWallet();
        if (!walletData) {
          toast.error("Wallet connection failed ❌");
          return;
        }
      }

      const activeSigner = walletData?.signer || signer;
      const userAccount = walletData?.account || account;

      if (!activeSigner || !userAccount) {
        toast.error("Wallet not ready ❌");
        return;
      }

      // =========================
      // 🔥 CONTRACT INSTANCE
      // =========================
      const contractInstance = new ethers.Contract(
        CONTRACT_ADDRESS,
        ABI,
        activeSigner
      );

      const usdt = new ethers.Contract(
        USDT_ADDRESS,
        USDTABI,
        activeSigner
      );

      // =========================
      // 🔥 PACKAGE PRICE (5 USDT)
      // =========================
      const PACKAGE_PRICE = ethers.parseUnits("1", 18);

      // =========================
      // 🔥 CHECK ALLOWANCE
      // =========================
      const allowance = await usdt.allowance(
        userAccount,
        CONTRACT_ADDRESS
      );

      if (allowance < PACKAGE_PRICE) {
        toast.info("Approving USDT...");

        const approveTx = await usdt.approve(
          CONTRACT_ADDRESS,
          PACKAGE_PRICE
        );

        await approveTx.wait();

        toast.success("USDT Approved ✅");
      }

      // =========================
      // 🔥 VALIDATE UPLINE
      // =========================
      if (!upline || isNaN(upline)) {
        toast.error("Invalid referral ID ❌");
        return;
      }

      // =========================
      //  REGISTER
      // =========================
      toast.info("Registering...");

      const tx = await contractInstance.register(
        upline,
        userAccount
      );
      

      await tx.wait();

      toast.success("Registration Successful 🎉");

      navigate("/dashboard");

    } catch (err) {
      console.error("Signup Error:", err);

      toast.error(
        err?.reason || err?.message || "Signup failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      titleButton={loading ? "PROCESSING..." : "REGISTER & START →"}
      onClick={signup}
      switchText="Already registered?"
      switchSignIn="Sign In"
      switchRoute="/signin"
      showRef={true}
      upline={upline}
    />
  );
};

export default SignUpPage;
 