import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const PAGE_SIZE = 10; // Ukuran halaman

const getPasien = async (id: number, page: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/pasien/${id}?page=${page}&size=${PAGE_SIZE}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch pasien data");
    }
    const data = await res.json();
    return data.pasien;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function DataList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pasienData, setPasienData] = useState([]);
  const id = 11;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPasien(id, currentPage);
      setPasienData(data);
    };
    fetchData();
  }, [currentPage]); // Memicu pengambilan data ketika currentPage berubah

  return (
    <div>
      <h2>List Data</h2>
      <ul>
        {/* Gunakan map untuk menampilkan list data */}
        {pasienData.map((data, index) => (
          <li key={index}>{data}</li>
        ))}
      </ul>
      {/* Tambahkan navigasi pagination */}
      <div>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        <span>{currentPage}</span>
        <button disabled={pasienData.length < PAGE_SIZE} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
      </div>
      {/* Tampilkan tabel dengan data pasien */}
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
          {pasienData.map((pasien, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{pasien}</td>
              <td>{pasien}</td>
              <td>{pasien}</td>
              <td>
                <Link href={`/editProduct/${pasien}`}>
                  <button className="btn btn-primary">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataList;
