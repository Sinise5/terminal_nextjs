"use client";
import CustomModal from '@/components/lcr/Modal';
import { useCallback, useRef, useState } from 'react';
import React from 'react';
import * as XLSX from 'xlsx';


const Lcr = () => {
    const [loading, setLoading] = useState(false);

    const filterReksadana = () => {
        // Fungsi untuk filter reksadana
        setLoading(true);
        // Lakukan operasi filtering atau pembaruan data di sini
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Contoh penundaan untuk menunjukkan efek loading
    };

    const ref = useRef<HTMLDialogElement>(null);
  const handleShow = useCallback(() => {
    ref.current?.showModal();
  }, [ref]);

  const renderTableRows = () => {
    const tableRows = [];
    const ver1 = ["a", "b", "c"];
    const ver2 = ["d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q"];
    const ver3 = ["d", "e", "f", "g", "h", "i", "j"];

    for (let i = 1; i <= 32; i++) {
        const rowCells = [];
        rowCells.push(<td key={`cell-${i}-0`}>{i}</td>);
        rowCells.push(<td key={`cell-${i}-1`}>Komponen</td>);
        rowCells.push(<td key={`cell-${i}-2`}>Haircut atau Run-off Rate atau Inflow Rate</td>);
        
        for (let j = 1; j <= 32; j++) {
            rowCells.push(<td key={`cell-${i}-${j * 2 + 1}`}>{j}</td>);
            rowCells.push(<td key={`cell-${i}-${j * 2 + 2}`}>Nilai setelah Haircut</td>);
        }

        rowCells.push(<td key={`cell-${i}-last-1`}>Nilai Outstanding atau Nilai Pasar (Rata-Rata Harian)</td>);
        rowCells.push(<td key={`cell-${i}-last-2`}>Nilai setelah Haircut atau Run-off Rate atau Inflow Rate</td>);

        tableRows.push(<tr key={`row-${i}`}>{rowCells}</tr>);
        
        // Add additional rows as needed
    }

    return tableRows;
};


    const exportToExcel = (tableId: string, fileName: string) => {
      const table = document.getElementById(tableId);
      const wb = XLSX.utils.table_to_book(table);
      XLSX.writeFile(wb, `${fileName}.xlsx`);
    };

const handleExport = () => {
    exportToExcel('datasemua', 'data_lcr'); // Ganti 'your-table-id' dengan ID tabel Anda
  };

    return (
        <>
    <CustomModal/>
            
            {/* Table */}
            <div className="row mt-3">
            <button type="button" id="exportButton" className="btn btn-primary btn-block rounded-pill " onClick={handleExport}>Export Excel</button>
                <div className="col-sm-12 col-xl-12">

                <table className="table table-bordered table-hover w-100 text-center text-truncate noExl" id="datasemua">
        <tr>
            <td>No</td>
            <td>Komponen</td>
            <td>Haircut atau <br />Run-off Rate atau<br /> Inflow Rate</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <th><br />{i + 1}</th>
                    <th>Nilai setelah Haircut</th>
                </React.Fragment>
            ))}
            <td>Nilai Outstanding atau Nilai Pasar (Rata-Rata Harian)</td>
            <td>Nilai setelah Haircut atau Run-off Rate atau Inflow Rate</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>A.HQLA</td>    
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>1.HQLA Level 1</td>    
        </tr>
        
        <tr>
            <td>1.1</td>
            <td style={{ textAlign: 'left' }}>Kas dan Setara Kas</td>
            <td id="ai">0</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`a${i + 1}`}>0</td>
                    <td id={`ax${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>1.2</td>
            <td style={{ textAlign: 'left' }}>Total penempatan pada Bank Indonesia, yaitu :</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.2.1. Bagian dari penempatan pada Bank Indonesia yang dapat ditarik saat kondisi stres</td>
            <td id="bi">0</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`b${i + 1}`}>0</td>
                    <td id={`bx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>1.3</td>
            <td style={{ textAlign: 'left' }}>Surat berharga yang memenuhi kriteria Pasal 10 ayat 1 huruf c :</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.1. Diterbitkan atau dijamin pemerintah negara lain</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.2. Diterbitkan atau dijamin oleh bank sentral negara lain</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.3. Diterbitkan atau dijamin oleh entitas sektor publik</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.4. Diterbitkan atau dijamin oleh bank pembangunan multilateral</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Diterbitkan atau dijamin oleh lembaga internasional (a.l BIS, IMF, ECB and European Community)</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>1.4</td>
            <td style={{ textAlign: 'left' }}>Surat berharga yang diterbitkan Pemerintah Pusat dan Bank Indonesia dalam rupiah dan valuta asing</td>
            <td id="ci">0</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`c${i + 1}`}>0</td>
                    <td id={`cx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>1.5</td>
            <td style={{ textAlign: 'left' }}>Surat berharga yang diterbitkan oleh pemerintah dan bank sentral negara lain dalam valuta asing <br />dengan bobot risiko lebih dari 0% yang memenuhi kriteria Pasal 10 ayat (1) huruf e</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah HQLA Level 1</td>   
            <td>0</td>
            <td>0</td> 
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>2. HQLA Level 2A</td> 
        </tr>
        <tr>
            <td>2.1</td>
            <td style={{ textAlign: 'left' }}>Surat berharga yang memenuhi kriteria Pasal 11 ayat (1) huruf a :</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.1.1. Diterbitkan atau dijamin pemerintah negara lain</td>
            <td>15</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.1.2. Diterbitkan atau dijamin oleh bank sentral negara lain</td>
            <td>15</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.1.3. Diterbitkan atau dijamin oleh entitas sektor publik</td>
            <td>15</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.1.4. Diterbitkan atau dijamin oleh bank pembangunan multilateral</td>
            <td>15</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>2.2</td>
            <td style={{ textAlign: 'left' }}>Surat berharga berupa surat utang yang diterbitkan oleh korporasi non-keuangan yang memenuhi kriteria Pasal 11 ayat (1) huruf b</td>
            <td>15</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>2.3</td>
            <td style={{ textAlign: 'left' }}>Surat berharga berbentuk covered bonds yang tidak diterbitkan oleh Bank pelapor atau pihak yang terafiliasi <br />dengan Bank pelapor yang memenuhi kriteria Pasal 11 ayat (1) huruf b</td>
            <td>15</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah HQLA Level 2A</td>   
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td> 
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>3. HQLA Level 2B</td> 
        </tr>
        <tr>
            <td>3.1</td>
            <td style={{ textAlign: 'left' }}>Efek beragun aset (EBA) berupa rumah tinggal yang memenuhi kriteria Pasal 12 ayat (1) huruf a</td>
            <td>25</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>3.2</td>
            <td style={{ textAlign: 'left' }}>Surat berharga berupa surat utang yang diterbitkan oleh korporasi yang memenuhi kriteria Pasal 12 ayat (1) huruf b</td>
            <td>50</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>3.3</td>
            <td style={{ textAlign: 'left' }}>Saham biasa yang dimiliki perusahaan anak bukan Bank yang memenuhi kriteria Pasal 12 ayat (1) huruf c</td>
            <td>50</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>3.4</td>
            <td style={{ textAlign: 'left' }}>Surat berharga pemerintah atau bank sentral negara lain dengan peringkat paling tinggi BBB+ dan paling rendah BBB-</td>
            <td>50</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah HQLA Level 2B</td>   
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td> 
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Total Jumlah HQLA sebelum penyesuaian</td>   
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td> 
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Penyesuaian untuk Batas Maksimum dari HQLA Level 2B	</td>   
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td> 
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Penyesuaian untuk Batas Maksimum dari HQLA Level 2</td>   
            <td>0</td>
            <td>0</td> 
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Total HQLA</td>   
            <td>0</td>
            <td>0</td> 
            <td>0</td>
            <td>0</td>
        </tr>	
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>B. Net Cash Outflow (Arus Kas Keluar Bersih)</td> 
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>1. Arus Kas Keluar</td> 
        </tr>
        <tr>
            <td>1.1</td>
            <td style={{ textAlign: 'left' }}>Penarikan Simpanan Nasabah Perorangan</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Jumlah Simpanan nasabah perorangan :</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.1.1. Simpanan stabil</td>
            <td id="di">5</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`d${i + 1}`}>0</td>
                    <td id={`dx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.1.2. Simpanan stabil yang memenuhi kriteria Pasal 50 ayat (2)</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah Simpanan stabil nasabah perorangan</td>
            
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.1.3. Simpanan kurang stabil</td>
            <td id="ei">10</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`e${i + 1}`}>0</td>
                    <td id={`ex${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
            
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.1.4.  Simpanan kurang stabil yang memenuhi kriteria Pasal 50 ayat (2) </td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.1.5. Tambahan kategori Simpanan dengan tingkat penarikan yang lebih tinggi yang ditetapkan oleh pengawas</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>-------- Kategori 1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>

        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>-------- Kategori 2</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>-------- Kategori 3</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah simpanan kurang stabil nasabah perorangan</td>
            
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah Simpanan nasabah perorangan</td>
            
        </tr>
        <tr>
            <td>1.2</td>
            <td style={{ textAlign: 'left' }}>Penarikan Pendanaan dari Nasabah Usaha Mikro dan Usaha Kecil</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Jumlah Pendanaan nasabah Usaha Mikro dan Usaha Kecil :</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.2.1. Pendanaan stabil dari nasabah yang memenuhi kriteria Pasal 15 ayat (1)</td>
            <td>5</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.2.2. Pendanaan stabil dari nasabah yang memenuhi.kriteria Pasal 15 ayat (2)</td>
            <td>5</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.2.3. Pendanaan stabil dari nasabah yang memenuhi kriteria Pasal 15 ayat (3)</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah Pendanaan nasabah stabil Usaha Mikro dan Usaha Kecil	</td>
            
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.2.4. Pendanaan kurang stabil dari nasabah yang memenuhi kriteria Pasal 21 ayat (1)</td>
            <td>10</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.2.5. Pendanaan kurang stabil yang memenuhi kriteria Pasal 50 .ayat (2)</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.2.6. Tambahan kategori Simpanan dengan tingkat penarikan yang lebih tinggi yang ditetapkan oleh pengawas</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>-------- Kategori 1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>

        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>-------- Kategori 2</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>-------- Kategori 3</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah Pendanaan nasabah kurang stabil Usaha Mikro dan Usaha.Kecil</td>
            
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah Penarikan Pendanaan Usaha Mikro dan Usaha Kecil</td>
            
        </tr>
        <tr>
            <td>1.3</td>
            <td style={{ textAlign: 'left' }}>Penarikan Pendanaan dari Nasabah Korporasi</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Jumlah Pendanaan dari nasabah korporasi :</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.1. Simpanan operasional :</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.1.1. Dijamin oleh LPS</td>
            <td id="fi">5</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`f${i + 1}`}>0</td>
                    <td id={`fx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.1.2. Tidak dijamin oleh LPS</td>
            <td id="gi">25</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`g${i + 1}`}>0</td>
                    <td id={`gx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.2. Simpanan operasional yang memenuhi kriteria Pasal 50 ayat (1):</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.2.1. Dijamin oleh Lembaga penjaminan</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.2.2. Tidak dijamin oleh lembaga penjaminan</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah Simpanan operasional nasabah korporasi</td>
            
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.2. Simpanan non-operasional dan/atau kewajiban yang bersifat non-operasional untuk kategori nasabah <br />perusahaan non-keuangan, Pemerintah Pusat, Bank Indonesia, Pemerintah Negara Lain, Bank Sentral Negara Lain, <br />Bank Pembangunan Multilateral, dan/atau.entitas sektor publik :</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.2.1. Dijamin oleh LPS</td>
            <td id="hi">20</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`h${i + 1}`}>0</td>
                    <td id={`hx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.2.1. Tidak dijamin oleh LPS</td>
            <td id="ii">40</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`i${i + 1}`}>0</td>
                    <td id={`ix${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>

        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.3. Simpanan non-operasional dan/atau kewajiban yang bersifat non.operasional yang memenuhi kriteria Pasal 50 ayat (1):</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.3.1. Dijamin oleh Lembaga penjaminan</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.3.3.2. Tidak dijamin oleh lembaga penjaminan</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Simpanan non-operasional dan/atau kewajiban yang bersifat non-operasional untuk kategori entitas lainnya</td>
            <td id="ji">100</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`j${i + 1}`}>0</td>
                    <td id={`jx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Surat berharga berupa surat utang yang diterbitkan Bank</td>
            <td id="ki">100</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`k${i + 1}`}>0</td>
                    <td id={`kx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah Simpanan non-operasional dan/atau kewajiban yang bersifat non-operasional</td>
            
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah Penarikan Pendanaan yang Berasal dari Nasabah Korporasi</td>
            
        </tr>
        <tr>
            <td>1.4</td>
            <td style={{ textAlign: 'left' }}>Penarikan Pendanaan dengan Agunan (Secured Funding)</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Transaksi dilakukan dengan Bank Indonesia</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Transaksi dilakukan dengan agunan HQLA Level 1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Transaksi dilakukan dengan agunan HQLA Level 2A</td>
            <td>15</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Transaksi dilakukan dengan Pemerintah Pusat atau entitas sektor publik yang memiliki bobot risiko paling tinggi 20% <br />atau bank pembangunan multilateral, dengan agunan selain HQLA Level 1 atau HQLA Level 2A</td>
            <td>25</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Transaksi dengan agunan HQLA Level 2B berupa EBA</td>
            <td>25</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Transaksi dengan agunan HQLA Level 2B selain EBA</td>
            <td>50</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Transaksi dilakukan dengan agunan selain HQLA</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah Penarikan Pendanaan dengan Agunan (Secured Funding)	</td>
            
        </tr>
        <tr>
            <td>1.5</td>
            <td style={{ textAlign: 'left' }}>Arus Kas Keluar Lainnya (Additional Requirement)</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.1. Arus kas keluar lainnya terkait transaksi derivatif</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.2. Arus kas keluar lainnya terkait peningkatan kebutuhan likuiditas</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.2.1. Terkait dengan perubahan mark to market atas transaksi derivatif atau transaksi lainnya</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>


        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.2.2. Terkait dengan potensi perubahan nilai agunan untuk derivatif dan transaksi lainnya</td>
            <td>20</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.2.3. Terkait dengan kelebihan agunan yang tidak terpisah (non-segregated collateral) yang dikuasai<br /> oleh Bank yang secara kontraktual dapat diambil setiap saat oleh pihak lawan</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.2.4. Terkait dengan kewajiban penyediaan agunan kepada pihak lawan (counterparty) atas suatu transaksi tertentu <br />namun pihak lawan (counterparty) belum meminta agunan tersebut</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.2.5. Terkait dengan potensi penukaran agunan yang berupa HQLA menjadi bukan HQLA</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.3. Arus kas keluar lainnya terkait kehilangan Pendanaan</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.3.1. Berasal dari efek beragun aset, covered bonds, dan instrumen pembiayaan terstruktur lainnya yang diterbitkan oleh Bank</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.3.2. Berasal dari asset-backed commercial paper, conduits, securities investment vehicles</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.4. Arus kas keluar lainnya terkait dengan kewajiban komitmen dalam bentuk fasilitas kredit</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.4.1. Fasilitas diberikan kepada perorangan atau Usaha Mikro dan Usaha Kecil</td>
            <td>5</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>

        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.4.2. Fasilitas diberikan kepada korporasi non-keuangan, Pemerintah Pusat, Bank Indonesia, <br />pemerintah negara lain, bank sentral negara lain, entitas sektor publik, <br />dan/atau bank pembangunan multilateral</td>
            <td>30</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.4.3. Fasilitas diberikan kepada Bank dan/atau lembaga jasa keuangan</td>
            <td>40</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>

        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.4.4. Fasilitas diberikan kepada entitas lainnya</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.5. Arus kas keluar lainnya terkait dengan kewajiban komitmen dalam bentuk fasilitas likuiditas</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.5.1. Fasilitas diberikan kepada perorangan atau Usaha Mikro dan Usaha Kecil</td>
            <td>5</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.5.2. Fasilitas diberikan kepada korporasi non-keuangan, Pemerintah Pusat, Bank Indonesia, <br />pemerintah negara lain, bank sentral negara lain, entitas sektor publik, dan/atau bank pembangunan multilateral</td>
            <td>30</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.5.3. Fasilitas diberikan kepada Bank dan/atau lembaga jasa keuangan</td>
            <td>40</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>

        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.5.4. Fasilitas diberikan kepada entitas lainnya</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.6. Kewajiban kontraktual lainnya untuk menyediakan dana kepada :</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.6.1. Lembaga jasa keuangan</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.6.2. Nasabah perseorangan</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.6.3. Korporasi non-keuangan</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.7. Kewajiban kontijensi Pendanaan lainnya</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.7.1. Berasal dari instrumen trade finance</td>
            <td>3</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.7.2. Berasal dari fasilitas kredit dan fasilitas likuiditas yang bersifat.unconditionally revocable uncommitted</td>
            <td id="li">0</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`l${i + 1}`}>0</td>
                    <td id={`lx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.7.3. Berasal dari letter of credit (L/C) dan garansi yang tidak terkait dengan kewajiban trade finance</td>
            <td id="mi">5</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`m${i + 1}`}>0</td>
                    <td id={`mx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.7.4. Berasal dari permintaan potensial untuk membeli kembali utang bank atau yang terkait <br />dengan securities investment vehicles dan fasilitas pembiayaan lainnya</td>
            <td>5</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.7.5. Berasal dari structured product yang diantisipasi oleh nasabah melalui …ready marketability</td>
            <td>5</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.7.6. Berasal dari dana kelolaan (managed funds) yang dijual dengan tujuan menjaga kestabilan nilai</td>
            <td>5</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.7.7. Kewajiban untuk menutup potensi pembelian kembali surat berharga, dengan atau tanpa agunan, <br />yang memiliki jangka waktu lebih dari 30 (tiga puluh) hari bagi emiten yang memiliki afiliasi <br />dengan dealer atau market maker</td>
            <td>5</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>1.5.7.8. Kewajiban non-kontraktual posisi short nasabah yang dilindungi dengan …agunan nasabah lain</td>
            <td>50</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Arus kas keluar kontraktual lainnya</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah Penarikan terkait Arus Kas Keluar Lainnya (Additional Requirement)	</td>
            <td>0</td>
            <td>0</td> 
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah Arus Kas Keluar	</td>
            <td>0</td>
            <td>0</td> 
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>2. Arus Kas Masuk		</td>
            
        </tr>
        <tr>
            <td>2.1</td>
            <td style={{ textAlign: 'left' }}>Pinjaman dengan Agunan (Secured Lending)</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Agunan tidak digunakan kembali untuk menutupi posisi short nasabah</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Agunan berupa HQLA Level 1</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>

        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Agunan berupa HQLA Level 2A</td>
            <td>15</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Agunan berupa EBA yang memenuhi persyaratan HQLA Level 2B</td>
            <td>25</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Agunan berupa HQLA Level 2B selain EBA</td>
            <td>50</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Transaksi berupa margin lending namun agunan berupa selain HQLA</td>
            <td>50</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Agunan tidak memenuhi persyaratan sebagaimana tersebut diatas</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>Agunan digunakan kembali untuk menutupi posisi short nasabah</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>Jumlah Arus Kas Masuk yang Berasal dari Pinjaman dengan Agunan (Secured Lending)			</td>
            
        </tr>
        <tr>
            <td>2.2</td>
            <td style={{ textAlign: 'left' }}>Tagihan berdasarkan Pihak Lawan (Counterparty)</td>
            <td></td>
            <td></td>
            <td></td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.2.1. Nasabah perorangan</td>
            <td id="ni">50</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`n${i + 1}`}>0</td>
                    <td id={`nx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.2.2. Nasabah Usaha Mikro dan Usaha Kecil</td>
            <td>50</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.2.3. Lembaga jasa keuangan</td>
            <td id="oi">100</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`o${i + 1}`}>0</td>
                    <td id={`ox${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.2.4. Bank Indonesia</td>
            <td id="pi">100</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`p${i + 1}`}>0</td>
                    <td id={`px${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>

        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.2.5. Lainnya (nasabah korporasi non-keuangan, Pemerintah Pusat, pemerintah negara lain, <br />entitas sektor publik dan bank pembangunan multilateral)</td>
            <td id="qi">0</td>
            {Array.from({ length: 31 }).map((_, i) => (
                <React.Fragment key={i}>
                    <td id={`q${i + 1}`}>0</td>
                    <td id={`qx${i + 1}`}>0</td>
                </React.Fragment>
            ))}
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td>2.3</td>
            <td style={{ textAlign: 'left' }}>Arus Kas Masuk Lainnya</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.3.1. Berasal dari transaksi derivatif</td>
            <td>100</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td></td>
            <td style={{ textAlign: 'left' }}>2.3.2. Berasal dari tagihan kontraktual lainnya</td>
            <td>50</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah Arus Kas Masuk Lainnya</td>
            <td>0</td>
            <td>0</td> 
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah Arus Kas Masuk</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td> 
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah Arus Kas Masuk yang dapat Diperhitungkan dalam Perhitungan LCR (maksimal 75% dari Total Arus Kas Keluar)	</td>
            <td>0</td>
            <td>0</td> 
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah Net Cash Out Flow</td>
            <td>0</td>
            <td>0</td> 
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>C.LCR</td>
            
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah HQLA</td>
            <td>0</td>
            <td>0</td> 
            <td>0</td>
            <td>0</td>
        </tr>
        <tr>
            <td colSpan={3} style={{ textAlign: 'left' }}>Jumlah Net Cash Out Flow</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td> 
        </tr>
        <tr>
            <td colSpan={5} style={{ textAlign: 'left' }}>NILAI LCR</td>
            
        </tr>
        
    </table>


                    
                </div>
            </div>
        </>
    );
};

export default Lcr;
