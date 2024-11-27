import XLSX from 'xlsx';

const exportToExcel = (tableId:any, fileName:any) => {
  const table = document.getElementById(tableId); // Ambil tabel berdasarkan ID
  const wb = XLSX.utils.table_to_book(table); // Konversi tabel ke workbook
  XLSX.writeFile(wb, `${fileName}.xlsx`); // Simpan workbook sebagai file Excel
};
