// components/TokenBalance.tsx
import { useState, useEffect } from 'react';

const TokenBalance = ({ address }: { address: string }) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenBalance = async (address: string) => {
      const providers = [
        `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`,
        `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
        'https://rpc.ankr.com/eth'
      ];

      for (const providerUrl of providers) {
        try {
          const response = await fetch(providerUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jsonrpc: '2.0',
              method: 'eth_call',
              params: [
                {
                  to: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
                  data: `0x70a08231000000000000000000000000${address.toLowerCase().substring(2)}`
                },
                'latest'
              ],
              id: 1
            })
          });
          
          const data = await response.json();
          console.log('Fetched balance:', data);

          if (data.result) {
            const balanceInHex = data.result;
            const balanceInDecimal = parseInt(balanceInHex, 16) / 1e6;
            setBalance(balanceInDecimal.toString());
            return; 
          }
        } catch (error) {
          console.error(`Failed with provider ${providerUrl}:`, error);
        }
      }

      throw new Error('All token balance fetch attempts failed');
    };

    if (address) {
      fetchTokenBalance(address);
    }
  }, [address]);

  if (error) {
    return <div style={{color: 'red'}}>Error: {error}</div>;
  }

  return (
    <div>
      {balance !== null ? (
        <p>Token balance: {balance} USDC</p>
      ) : (
        <p>Loading token balance...</p>
      )}
    </div>
  );
};

export default TokenBalance;
