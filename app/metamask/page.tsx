import React, { useState } from 'react';
import Web3 from 'web3';
import MyTokenABI from '@/api/api.json'; // Contoh ABI kontrak token
import SwapContractABI from '../contracts/SwapContractABI.json'; // Contoh ABI kontrak swap

const SwapPage = () => {
  const [userAddress, setUserAddress] = useState('');
  const [selectedToken, setSelectedToken] = useState('');
  const [swapAmount, setSwapAmount] = useState('');
  const [swapResult, setSwapResult] = useState('');

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request MetaMask to connect
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);

        // Get user's Ethereum address
        const accounts = await web3.eth.getAccounts();
        setUserAddress(accounts[0]);
      } catch (error) {
        console.error('Gagal terhubung ke MetaMask:', error);
      }
    } else {
      console.error('MetaMask tidak ditemukan di browser Anda.');
    }
  };

  const handleSwap = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const myTokenContract = new web3.eth.Contract(MyTokenABI, 'MyTokenContractAddress'); // Ganti dengan alamat kontrak token Anda
      const swapContract = new web3.eth.Contract(SwapContractABI, 'SwapContractAddress'); // Ganti dengan alamat kontrak swap Anda

      // Panggil fungsi swap pada kontrak swap
      const result = await swapContract.methods.swap(selectedToken, swapAmount).send({ from: userAddress });

      setSwapResult(`Transaksi berhasil. Hash: ${result.transactionHash}`);
    } catch (error) {
      console.error('Gagal melakukan swap:', error);
      setSwapResult('Gagal melakukan swap. Periksa konsol untuk detail kesalahan.');
    }
  };

  return (
    <div>
      <button onClick={connectMetaMask}>Hubungkan ke MetaMask</button>
      <p>Alamat Dompet MetaMask: {userAddress}</p>
      <input type="text" placeholder="Pilih token" value={selectedToken} onChange={(e) => setSelectedToken(e.target.value)} />
      <input type="number" placeholder="Jumlah token untuk swap" value={swapAmount} onChange={(e) => setSwapAmount(e.target.value)} />
      <button onClick={handleSwap}>Swap</button>
      <p>{swapResult}</p>
    </div>
  );
};

export default SwapPage;
