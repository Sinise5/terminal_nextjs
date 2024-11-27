"use client";

import React, { useState } from 'react';
import Web3 from 'web3';
import { faker } from '@faker-js/faker';

const Web3Component = () => {
  const [userAddress, setUserAddress] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('mainnet'); // Default network
  const [phrase, setPhrase] = useState('');
  const [balance, setBalance] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [phrases, setPhrases] = useState<string[]>([]);
  const [sampah, setSampah] = useState<string[][]>([]); 

  const handlePhraseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhrase(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setBalance(null);

    const res = await fetch('http://localhost:3000/api/web3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phrase }),
    });

    const data = await res.json();
    console.log(data);
    if (data.error) {
      setError(data.error);
    } else {
      setBalance(data.balance);
      if (data.balance !== '0.000') {
        setPhrases((prevPhrases) => [...prevPhrases, phrase]);
      }
    }
  };

  const generateWords = () => {
    const newWords = Array.from({ length: 12 }, () => faker.word.noun());
    return newWords;
  };

  const generateWordsMultipleTimes = () => {
    let allWords: string[][] = [];
    for (let i = 0; i < 10; i++) {
      allWords.push(generateWords());
    }
    setSampah(allWords);
    //console.log(allWords.join(' '))
    handlePhraseChange
  };

  return (
    <>
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
        <button onClick={generateWordsMultipleTimes}>Generate Words</button>
        <div id="sampah" style={{ maxHeight: '200px', overflowY: 'scroll', border: '1px solid #ccc', marginTop: '20px', padding: '10px' }}>
          <h2>Generated Words</h2>
          <table>
            <tbody>
              {sampah.map((words, index) => (
                <tr key={index}>
                  <td>
                 
                  { words.join(' ')}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Web3Component;