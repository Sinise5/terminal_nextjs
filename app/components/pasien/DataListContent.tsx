"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';



const getPasien = async (id: any) => {
  try {
      const res = await fetch(`http://localhost:3000/api/pasien/${id}`, {
          cache: "no-store",
      });
      if (!res.ok) {
          throw new Error("Failed to fetch product");
      }
      const data = await res.json();
      return data.pasien;
  } catch (error) {
      console.error(error);
      return null;
  }
};



// eslint-disable-next-line @next/next/no-async-client-component
//const DataListContent =  async () => {
  export async function DataListContent() {
  // Data contoh untuk list
  const dataList = ['Data 1', 'Data 2', 'Data 3'];
  const id = 11;
  
  useEffect(() => {
    const getPasienData = async () => {
      const pasienData = await getPasien(id);
      console.log('Data pasien:', pasienData);
      // Lakukan sesuatu dengan data pasien, misalnya tampilkan di UI
    };

    getPasienData(); // Panggil fungsi hanya sekali saat komponen dipasang
  }, []); // Gu

  return (
    <div>
      <h2>List Data</h2>
      <ul>
        {/* Gunakan map untuk menampilkan list data */}
        {dataList.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
      <table className="table">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                    {/*products.map((rs:any) => (*/}
                    <tr className="hover" >
                        <th>1</th>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                <div className="mask mask-squircle w-12 h-12">
                                    
                                </div>
                                </div>
                                <div>
                                <div className="font-bold">xxx</div>
                                </div>
                            </div>
                        </td>
                        <td>
                           iiii
                        </td>
                        <td>aaa</td>
                        <th>
                            <Link href={`/editProduct/`}>
                                <button className="btn btn-primary">Edit</button>
                            </Link>
                            {/*<RemoveBtn id={rs._id} /> ${rs._id}*/}
                        </th>
                    </tr>
                    {/*})) */}                    
                </tbody>
            </table>
    </div>
  );
};

export default DataListContent;
