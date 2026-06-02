import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "../context/Web3Context";
import AuthLayout from "./AuthPage";
import {  toast } from "react-toastify";
 

const SignInPage = () => {
  const navigate = useNavigate();
  const { account, contract, connectWallet, signInWithWallet } = useWeb3();
  const [loading, setLoading] = useState(false);

  const signin = async () => {
    try {
      setLoading(true);

       

      let walletData;

      if (!account || !contract) {
        

        walletData = await connectWallet();

        if (!walletData) {
           toast.error("Wallet connection failed ❌", {
            style: { background: "#dc2626", color: "#fff" },
          });
          return;
        }

        
      }

      const currentAccount = walletData?.account || account;
      const activeContract = walletData?.contract || contract;

      if (!currentAccount || !activeContract) {
        toast.error("Wallet or Contract not ready ❌", {
          style: { background: "#dc2626", color: "#fff" },
        });
        return;
      }

      toast.info("Requesting Signature...", {
        style: { background: "#2563eb", color: "#fff" },
      });

      const signed = await signInWithWallet(currentAccount);

      if (!signed) {
        toast.warning("Signature rejected ⚠️", {
          style: { background: "#f97316", color: "#fff" },
        });
        return;
      }

     

      const userId = await activeContract.ids(currentAccount);
      //const userId=111111;

      if (Number(userId) === 0) {
        toast.warning("User not registered. Redirecting...", {
          style: { background: "#f97316", color: "#fff" },
        });
        navigate("/signup");
      } else {
        // toast.success("Login Successful 🚀", {
        //   style: { background: "#16a34a", color: "#fff" },
        // });
        // localStorage.setItem("showWalletToast", "true");
        navigate("/dashboard");
      }

    } catch (err) {
      console.error("Signin error:", err);

      toast.error("Signin failed ❌", {
        style: { background: "#dc2626", color: "#fff" },
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthLayout
        titleButton={loading ? "Connecting..." : "SIGN IN TO CONTINUE →"}
        onClick={signin}
        switchText="New here? Create Account"
        switchRoute="/signup"
        showRef={false}
      />

     
    </>
  );
};

export default SignInPage;
