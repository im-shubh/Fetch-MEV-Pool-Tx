import { ethers } from "ethers";
import pLimit from "p-limit";

const provider = new ethers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/<your-infura-project-id>");

// Limit concurrent requests to avoid rate limits
const limit = pLimit(1); // Allow only 5 concurrent requests
// Uniswap V3 Router address and ABI
const uniswapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Uniswap V3 Router
provider.on("pending", (txHash) => {
  limit(() => fetchTransaction(txHash));
});

async function fetchTransaction(txHash) {
  try {
    console.log("Listening for pending transactions...");

    const tx = await provider.getTransaction(txHash);
    console.log("MempoolTx --:", tx);
    
    // Skip if transaction is null or not to the Uniswap Router
    if (!tx || !tx.to || tx.to.toLowerCase() !== uniswapRouterAddress.toLowerCase()) return;
    
    console.log(`Fetched transaction: ${tx.hash}`);
    console.log(`Fetched transaction to: ${tx.to}`);
    console.log(`Fetched transaction from: ${tx.from}`);
    console.log(`Fetched transaction nonce: ${tx.nonce}`);
    console.log(`Fetched transaction gasLimit: ${tx.gasLimit}`);
    console.log(`Fetched transaction value: ${tx.value}`);

  } catch (error) {
    console.error(`Error fetching transaction ${txHash}:`, error);
  }
}
