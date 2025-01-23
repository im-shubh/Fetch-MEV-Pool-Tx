# Uniswap Pending Transaction Listener

This script listens for pending transactions on the Ethereum mainnet mempool and filters transactions that interact with the Uniswap V3 Router contract. It uses Ethers.js and p-limit to handle WebSocket connections and rate-limiting.

## Features
- Listens to pending transactions using Infura WebSocket provider.
- Filters transactions sent to the Uniswap V3 Router contract.
- Logs transaction details such as hash, sender, receiver, nonce, gas limit, and value.
- Implements rate limiting to avoid API throughput issues.

## Prerequisites
- Node.js (v14 or later recommended)
- Infura project ID (or another WebSocket endpoint)

## Installation
1. Clone the repository or copy the script into a file, e.g., `index.js`.
2. Install dependencies using npm:
   ```bash
   npm install ethers p-limit
   ```

## Usage
1. Replace `<your-infura-project-id>` in the script with your Infura project ID:
   ```javascript
   const provider = new ethers.WebSocketProvider("wss://mainnet.infura.io/ws/v3/<your-infura-project-id>");
   ```

2. Run the script:
   ```bash
   node index.js
   ```

## Script Overview
### Imports
- **Ethers.js**: Used for interacting with the Ethereum blockchain.
- **p-limit**: Provides rate-limiting to avoid API throttling.

### Uniswap V3 Router Details
- Contract Address: `0xE592427A0AEce92De3Edee1F18E0157C05861564`

### Main Functions
- **`fetchTransaction(txHash)`**:
  - Fetches transaction details from the Ethereum mempool.
  - Filters transactions sent to the Uniswap V3 Router.
  - Logs transaction details (hash, sender, receiver, nonce, gas limit, and value).

- **Rate Limiting**:
  - The `pLimit` library is used to restrict the number of concurrent requests to 1.

### Logs
The script outputs the following details for valid Uniswap transactions:
- Transaction hash
- Receiver address
- Sender address
- Nonce
- Gas limit
- Value

## Example Output
```
Listening for pending transactions...
MempoolTx --: { ...transaction details... }
Fetched transaction: 0x...
Fetched transaction to: 0xE592427A0AEce92De3Edee1F18E0157C05861564
Fetched transaction from: 0x...
Fetched transaction nonce: 123
Fetched transaction gasLimit: 21000
Fetched transaction value: 1000000000000000000
```

## Error Handling
The script handles the following errors:
- Invalid or null transactions.
- Rate limit errors.
- WebSocket connection issues.

## Notes
- Ensure your Infura project ID is valid and has sufficient throughput capacity.
- If you encounter rate limit errors, consider upgrading your Infura plan or further throttling requests.

