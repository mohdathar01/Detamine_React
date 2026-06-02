// withdrawService.js

import { ethers } from "ethers";

const RPC_URL = "https://rpc-amoy.polygon.technology";

const PRIVATE_KEY = "e56f635d259e469e61372bd9e128f3dc5c356c0f1dd8d7b2cd53dd2e0bc22091";

const CONTRACT_ADDRESS = "0xFDF4F7FC4CdDb1eacdc6666f315eE8E25ABE586D";

const ABI =[{"inputs":[{"internalType":"address","name":"_token","type":"address"},{"internalType":"uint256","name":"_initialFee","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"Deposited","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newFee","type":"uint256"}],"name":"FeeUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"oldOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Withdrawn","type":"event"},{"inputs":[],"name":"contractBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"deposit","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"getUserBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"serviceFeePercent","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_newFee","type":"uint256"}],"name":"setServiceFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userBalance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdrawToOwner","outputs":[],"stateMutability":"nonpayable","type":"function"}] ;



const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY,provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS,ABI,wallet);



export const withdrawService = async (userAddress,amount) => {

  try {

    if (!userAddress || !amount) {
      return {
        success: false,
        message: "Invalid Params"
      };
    }

    // USDT 18 decimals
    const value = ethers.parseUnits(amount.toString(),18);

    // withdraw tx
    const tx = await contract.withdraw(
        0x6137d3e622920543Cf36923496Cb9738E959D3dC,  // use the variable userAddress instead of hardcoded address its for testing purpose only
        5000000000000000000   //  value  plz put amount  in wei (1=1000000000000000000) for example if you want to withdraw 10 USDT then amount should be 10*1e18
    );

    console.log(
      "Withdraw TX:",
      tx.hash
    );

    // wait confirmation
    await tx.wait();

    return {
      success: true,
      hash: tx.hash,
      message: "Withdraw Successful"
    };

  } catch (error) {

    console.log(
      "Withdraw Error:",
      error
    );

    return {
      success: false,
      message:
        error.message
    };
  }
};