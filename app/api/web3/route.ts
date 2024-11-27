import { ethers } from 'ethers';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const { phrase } = await req.json();
    const rpcUrl = 'https://blast.blockpi.network/v1/rpc/public';

    if (!phrase || phrase.split(' ').length !== 12) {
      return NextResponse.json({ error: 'Invalid phrase' }, { status: 400 });
    }

    // Buat wallet dari phrase
    const wallet = ethers.Wallet.fromPhrase(phrase);

    // Menghubungkan ke jaringan Ethereum (mainnet)
    const provider = ethers.getDefaultProvider();

    // Menghubungkan ke jaringan Ethereum yang ditentukan
    const provider_other = new ethers.JsonRpcProvider(rpcUrl);

    // Mendapatkan saldo
    const balance = await provider_other.getBalance(wallet.address);

    // Konversi saldo dari wei ke ether
    const balanceInEth = ethers.formatEther(balance);

    const formattedBalance = parseFloat(balanceInEth).toFixed(5);

    return NextResponse.json({ balance: formattedBalance }, { status: 200 });
  } catch (error) {
    console.error('Error fetching balance:', error);
    return NextResponse.json({ error: 'Error fetching balance' }, { status: 500 });
  }
};