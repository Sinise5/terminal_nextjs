"use client";

import React, { useState } from 'react';
import dataWeb3 from 'web3';
//import randomWordss from 'random-words';
//import { randomWords } from 'random-words';
import { faker } from '@faker-js/faker';

const Web3 = () => {
    const [userAddress, setUserAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet'); // Default network

  const [phrase, setPhrase] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [phrases, setPhrases] = useState<String[]>([]); 
  const [sampah, setSampah] = useState<String[]>([]); 
  //const [words, setWords] = useState([]);

  const handlePhraseChange = (e:any) => {
    setPhrase(e.target.value);
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError(null);
    setBalance(null);
    //console.log(phrase)
    const res = await fetch('http://localhost:3000/api/web3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phrase }),
    });

    const data = await res.json();
console.log(data)
    if (data.error) {
      setError(data.error);
    } else {
      setBalance(data.balance);
      if (data.balance !== '0.000') {
        setPhrases((prevPhrases) => [...prevPhrases, phrase]);
      }
    }
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        // Request MetaMask to connect
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new dataWeb3(window.ethereum);

        // Get user's Ethereum address
        const accounts = await web3.eth.getAccounts();
        setUserAddress(accounts[0]);

        // Get network ID
        const networkId = await web3.eth.net.getId();
        setSelectedNetwork(getNetworkName(networkId)); // Convert network ID to name
        console.log(networkId)
        //=================
        web3.eth.net.getPeerCount()
        .then((peerCount) => {
          console.log('Jumlah peer yang terhubung:', peerCount);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  //===============
  web3.eth.net.isListening()
  .then((isListening) => {
    console.log('Apakah node Ethereum sedang mendengarkan:', isListening);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
        //===============
        /*web3.eth.net.getNetworkType()
  .then((networkType:any) => {
    console.log('Jenis jaringan Ethereum:', networkType);
  })
  .catch((error:any) => {
    console.error('Error:', error);
  });
  

  //=============
  web3.eth.net.getChainId()
  .then((chainId:any) => {
    console.log('Identifikasi rantai Ethereum:', chainId);
  })
  .catch((error:any) => {
    console.error('Error:', error);
  });
  //===========
  web3.eth.net.getGasPrice()
  .then((gasPrice) => {
    console.log('Harga gas rata-rata saat ini:', gasPrice);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
//==========
web3.eth.net.getProtocolVersion()
  .then((protocolVersion) => {
    console.log('Versi protokol Ethereum:', protocolVersion);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
//==========
web3.eth.net.isSyncing()
  .then((syncStatus) => {
    if (syncStatus) {
      console.log('Node Ethereum sedang melakukan sinkronisasi:', syncStatus);
    } else {
      console.log('Node Ethereum sudah sinkron dengan jaringan Ethereum.');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });

*/

      } catch (error) {
        console.error('Gagal terhubung ke MetaMask:', error);
      }
    } else {
      console.error('MetaMask tidak ditemukan di browser Anda.');
    }
  }
  

  const generateWords = () => {
    const newWords = Array.from({ length: 12 }, () => faker.word.noun());
    //setWords(newWords);
    setPhrases((prevPhrases) => [...prevPhrases, ...newWords]);
  };

  

  const getNetworkName = (networkId :any) => {
    switch (networkId) {
      case '1':
        return 'Mainnet';
      case '3':
        return 'Ropsten';
      case '4':
        return 'Rinkeby';
      case '5':
        return 'Goerli';
      case '42':
        return 'Kovan';
      case '81457':
        return 'Blast Mainnet';
      default:
        return 'Unknown';
    }
  };

  return (
   <> <div>
      <button onClick={connectMetaMask}>Hubungkan ke MetaMask</button>
      <p>Alamat Dompet MetaMask: {userAddress}</p>
      <p>Jaringan Ethereum Terpilih: {selectedNetwork}</p>
    </div>
    <div>
      <h1>Check Ethereum Wallet Balance</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your 12-word phrase"
          value={phrase}
          onChange={handlePhraseChange}
        />
        <button type="submit">Check Balance</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {balance !== null && (
        <div>
          <h2>Balance Information</h2>
          <p>{balance} ETH</p>
        </div>
      )}
       <button onClick={generateWords}>Generate Words</button>
      <div id="sampah">
          <h2>Non-Zero Balances</h2>
          {phrases.map((p, index) => (
            //<p key={index}>{p}</p>
            p+' '
          ))}
        </div>
    </div>
    </>
    
  );
};
 
export default Web3;