// components/TokenBalance.tsx
import { useState, useEffect } from 'react';

const TokenBalance = ({ address }: { address: string }) => {
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenBalance = async () => {
      try {
        const res = await fetch(`/api/getTokenBalance?address=${address}`);
        const data = await res.json();
        setBalance(data.balance);
      } catch (error) {
        console.error('Error fetching token balance:', error);
        setBalance(null);
      }
    };

    fetchTokenBalance();
  }, [address]);

  return (
    <div>
      {balance !== null ? (
        <p>Token balance: {balance} ETH</p>
      ) : (
        <p style={{color:'#fff'}}>Loading token balance...</p>
      )}
    </div>
  );
};

export default TokenBalance;