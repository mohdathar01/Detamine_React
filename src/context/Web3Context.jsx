import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { ABI, USDTABI, CONTRACT_ADDRESS, USDT_ADDRESS } from "../components/web3/config";

export const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [usdtContract, setUsdtContract] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isSigned, setIsSigned] = useState(false);

  const REQUIRED_CHAIN_ID = 56; //BSCscan

  // 🔥 Initialize Provider Safely
  const initializeProvider = async () => {
    const _provider = new ethers.BrowserProvider(window.ethereum);
    const network = await _provider.getNetwork();

    if (!network || !network.chainId) {
      throw new Error("Network not detected");
    }

    return { _provider, network };
  };

  //  CONNECT WALLET
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask");
        return null;
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const { _provider, network } = await initializeProvider();

      if (Number(network.chainId) !== REQUIRED_CHAIN_ID) {
       alert(" Please switch to Binance Smart Chain ❖ to ");
        return null;
      }

      const _signer = await _provider.getSigner();
      const _account = await _signer.getAddress();

      const _mainContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, _signer);
      const _usdtContract = new ethers.Contract(USDT_ADDRESS, USDTABI, _signer);

      setProvider(_provider);
      setSigner(_signer);
      setAccount(_account);
      setContract(_mainContract);
      setUsdtContract(_usdtContract);
      setChainId(Number(network.chainId));

      return {
        account: _account,
        contract: _mainContract,
        signer: _signer,
      };
    } catch (error) {
      console.error("Wallet connection failed:", error);
      return null;
    }
  };

  // 🔥 SIGN MESSAGE
  const signInWithWallet = async (_account) => {
    try {
      if (!window.ethereum) return false;

      const { _provider } = await initializeProvider();
      const _signer = await _provider.getSigner();

      const message = `PROHASH Login\nWallet: ${_account}\nNonce: ${Date.now()}`;
      await _signer.signMessage(message);

      setIsSigned(true);
      return true;
    } catch (err) {
      console.warn("User rejected signing");
      setIsSigned(false);
      return false;
    }
  };

  // 🔥 Handle Account + Chain Change (NO RELOAD)
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        setAccount(null);
        setSigner(null);
        setContract(null);
        setUsdtContract(null);
        setIsSigned(false);
      } else {
        setAccount(accounts[0]);
      }
    };

    const handleChainChanged = async () => {
      try {
        const { _provider, network } = await initializeProvider();
        setProvider(_provider);
        setChainId(Number(network.chainId));

        if (Number(network.chainId) === REQUIRED_CHAIN_ID) {
          const _signer = await _provider.getSigner();
          const _mainContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, _signer);
          const _usdtContract = new ethers.Contract(USDT_ADDRESS, USDTABI, _signer);

          setSigner(_signer);
          setContract(_mainContract);
          setUsdtContract(_usdtContract);
        }
      } catch (err) {
        console.error("Chain change error:", err);
      }
    };

    window.ethereum.on("accountsChanged", handleAccountsChanged);
    window.ethereum.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        contract,
        usdtContract,
        chainId,
        isSigned,
        connectWallet,
        signInWithWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
