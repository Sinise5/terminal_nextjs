"use client";
import React, { useState } from 'react';
import DataListContent from '@/components/pasien/DataListContent';
import InputDataContent from '@/components/pasien/InputDataContent';
import DataList from '@/components/pasien/DataList';

const MainPage = () => {
  // State untuk menentukan tampilan: list atau form
  const [isListView, setIsListView] = useState(true);

  return (
    <div>
      {/* Tombol untuk toggle antara tampilan list dan form */}
      <button onClick={() => setIsListView(!isListView)}>
        {isListView ? 'Show Input Form' : 'Show Data List'}
      </button>
      
      {/* Block konten */}
      <div>
        {isListView ? <DataList /> : <InputDataContent />}
      </div>
    </div>
  );
};

export default MainPage;
