// utils/api/getTokenBalance.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {   

    const INFURA_BASE_URL = `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}`;

    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { address } = req.query;

    if (!address || typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid address' });
    }

    const payload = {
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
    };

    try {
      const response = await fetch(INFURA_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const responseText = await response.text();
      const responseData = JSON.parse(responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, ${responseText}`);
      }

      if (responseData.error) {
        throw new Error(`API Error: ${responseData.error.message}`);
      }

    } catch (fetchError) {
      console.error('Fetch Error Details:', fetchError);
      throw fetchError;
    }
  } catch (error) {
    console.error('Complete Error Stack:', error);
    res.status(500).json({ 
      error: 'Failed to fetch token balance', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
