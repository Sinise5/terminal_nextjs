import React, { useCallback, useRef, useState } from 'react';
import axios from 'axios';

const CustomModal = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const ref = useRef<HTMLDialogElement | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleShow = useCallback(() => {
    if (ref.current) {
      ref.current.showModal();
    }
  }, [ref]);

  const handleUpload = async () => {
    if (!files) return;
  
    setLoading(true);

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("fileToUpload[]", files[i]);
    }
  
    try {
      const response = await fetch("/api/lcr", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        const keys = Object.keys(data['data']);
        //console.log("Response x:", data);
        const kode_j: any[] = []; const urutan_j: any[] = []; const total_j: any[] = [];
       
        keys.forEach(key => {
          const value = data[key];
          
          const parsedFileName = parseFileName(key);
          //console.log("pecahan:", parsedFileName.pecahan);
          //console.log("pecahan0:", parsedFileName.pecahan0);
          //console.log("nilai_terakhir:", parsedFileName.nilai_terakhir);
          const digit_awal = parsedFileName.digit_awal[0]
          const digit_split = parsedFileName.digit_awal[2]
          const dua_digit_terakhir = parseInt(parsedFileName.dua_digit_terakhir)
          //console.log("dua_digit_terakhir:", dua_digit_terakhir);
         // console.log("digit_awal:", digit_awal);
          //console.log("file x:", `${key}: `+JSON.stringify(data['data'][key]));
          const myArray = ['a','b','l','m'];
          let totalPrincipalAmount0 = 0; let totalPrincipalAmount1 = 0; let totalPrincipalAmount2 = 0; let totalPrincipalAmount3 = 0; let totalPrincipalAmount4 = 0; let xx=0

          const totalPrincipalAmount = [0, 0, 0, 0, 0, 0, 0];
          data['data'][key].forEach((item: {
            AMORTPAYMENTAMOUNT: string;
            CREATIONDATE: string;
            ACCOUNTTYPE: string;
            CONTRACTUALFEATURE: string;
            ENDDATE: string;
            STARTDATE: string;
            COUNTERPARTY: string;
            DESCRIPTION: string;
            PRINCIPALAMOUNT: any; 
        }) => {
            let principalAmount = parseFloat(item.PRINCIPALAMOUNT);
            let description = item.DESCRIPTION; // Tidak perlu parseFloat karena tampaknya ini adalah string
            let counterparty = item.COUNTERPARTY; // Tidak perlu parseFloat karena tampaknya ini adalah string
            let amortPayment = parseFloat(item.AMORTPAYMENTAMOUNT); // Tetap menggunakan parseFloat karena tampaknya ini adalah nilai numerik
            let startdate = item.STARTDATE; // Tidak perlu parseFloat karena tampaknya ini adalah string
            let enddate = item.ENDDATE; // Tidak perlu parseFloat karena tampaknya ini adalah string
            let contract = (item.CONTRACTUALFEATURE); // Tetap menggunakan parseFloat karena tampaknya ini adalah nilai numerik
            let accounttype = (item.ACCOUNTTYPE); // Tetap menggunakan parseFloat karena tampaknya ini adalah nilai numerik
            let creationdate = item.CREATIONDATE; // Tetap menggunakan parseFloat karena tampaknya ini adalah nilai numerik
            
            // Memeriksa apakah principalAmount adalah NaN
            if (isNaN(principalAmount)) {
              // Jika principalAmount adalah NaN, setel nilainya ke 0
              principalAmount = 0.0;
          }

            // Menambahkan logika kontrol aliran
            if (myArray.includes(digit_awal)) {
              totalPrincipalAmount[0] += principalAmount;
            } else if (digit_awal == 'c_k') {
                // Lakukan sesuatu jika digit_awal adalah 'c_k'
                const parts = digit_awal.split('_');
                if(description == 'SIMA Borrowing IDR'){
                  totalPrincipalAmount[0] += principalAmount;  
                }else  if((description == 'SUKBI') || (description == 'SBSN')){
                  totalPrincipalAmount[1] += principalAmount;  
                }
            } else if (digit_awal == 'n_o_p_q') {
                // Lakukan sesuatu jika digit_awal adalah 'n_o_p_q'

                const selisih = selisihbulan(startdate.substring(0, 10),enddate.substring(0, 10))
                if (selisih == 0) {
                  
                  if(counterparty == '9'){
                    totalPrincipalAmount[0] += principalAmount;
                  }else if((counterparty == '12') || (counterparty == '13')){
                    totalPrincipalAmount[1] += principalAmount;
                  }else if(counterparty == '1'){
                    totalPrincipalAmount[2] += principalAmount; 
                  }else if((counterparty == '11') || (counterparty == '3')){
                    totalPrincipalAmount[3] += principalAmount;
                  }

                }else{

                  if(counterparty == '9'){
                    totalPrincipalAmount[0] += principalAmount / selisih;
                  }else if((counterparty == '12') || (counterparty == '13')){
                    totalPrincipalAmount[1] += principalAmount / selisih;
                  }else if(counterparty == '1'){
                    totalPrincipalAmount[2] += principalAmount / selisih;
                  }else if((counterparty == '11') || (counterparty == '3')){
                    totalPrincipalAmount[3] += principalAmount / selisih;
                  }

                }

                
                
            } else if (digit_awal == 'd_e_f_g_h_i_j') {
                // Lakukan sesuatu jika digit_awal adalah 'd_e_f_g_h_i_j'
                if(digit_split == '1'){

                     const Deposito = filterDepositoByDate(creationdate, enddate.substring(0, 10));
                     
                                          
                    if(Deposito == 1){ 
                      if((counterparty == '9') && (contract == '1') && ((accounttype == '0') || (accounttype == '4'))){
                        totalPrincipalAmount[0] += principalAmount;
                      }else if((counterparty == '9') && ((contract == '2') || (contract == '1')) && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                        totalPrincipalAmount[1] += principalAmount;
                      }else if((counterparty == '3') && (contract == '1') && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                        totalPrincipalAmount[2] += principalAmount;
                      }else if((counterparty == '3') && (contract == '2') && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                        totalPrincipalAmount[3] += principalAmount;
                      }else if(((counterparty == '1') || (counterparty == '11')) && (contract == '1') && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                        totalPrincipalAmount[4] += principalAmount;
                      }else if(((counterparty == '1') || (counterparty == '11')) && (contract == '2') && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                        totalPrincipalAmount[5] += principalAmount;
                      }else if(((counterparty == '12') || (counterparty == '13') || (counterparty == '')) && ((contract == '2') || (contract == '1')) && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                        totalPrincipalAmount[6] += principalAmount;
                      }

                    }
                                      

                                          
                                  }else{

                    if((counterparty == '9') && (contract == '1') && ((accounttype == '0') || (accounttype == '4'))){
                      totalPrincipalAmount[0] += principalAmount;
                    }                                
                    else if((counterparty == '9') && ((contract == '2') || (contract == '1')) && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                      totalPrincipalAmount[1] += principalAmount;
                    }
                    else if((counterparty == '3') && (contract == '1') && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                      totalPrincipalAmount[2] += principalAmount;
                    }
                    else if((counterparty == '3') && (contract == '2') && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                      totalPrincipalAmount[3] += principalAmount;
                    }
                    else if(((counterparty == '1') || (counterparty == '11')) && (contract == '1') && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                      totalPrincipalAmount[4] += principalAmount;
                    }
                    else if(((counterparty == '1') || (counterparty == '11')) && (contract == '2') && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                      totalPrincipalAmount[5] += principalAmount;
                    }
                    else if(((counterparty == '12') || (counterparty == '13') || (counterparty == '')) && ((contract == '2') || (contract == '1')) && ((accounttype == '0') || (accounttype == '4') || (accounttype == '5'))){
                      totalPrincipalAmount[6] += principalAmount;
                    }
                                          
                                  } 
            }
            
            
        });

        if (myArray.includes(digit_awal)) {
          totalPrincipalAmount[0] = totalPrincipalAmount[0] / 1000000;
          kode_j.push(digit_awal)
          urutan_j.push(dua_digit_terakhir)
          total_j.push(totalPrincipalAmount[0])       
        } else if (digit_awal == 'c_k') {
            // Lakukan sesuatu jika digit_awal adalah 'c_k'
            let no = 0; 
            const parts = digit_awal.split('_');
            for (const part of parts) {
              totalPrincipalAmount[no] = totalPrincipalAmount[no] / 1000000;
                kode_j.push(part);
                urutan_j.push(dua_digit_terakhir);
                total_j.push(totalPrincipalAmount[no]);
                no++;
            } 
        } else if (digit_awal == 'n_o_p_q') {
            // Lakukan sesuatu jika digit_awal adalah 'n_o_p_q'

            let no = 0; 
            const parts = digit_awal.split('_');
            for (const part of parts) {
              totalPrincipalAmount[no] = totalPrincipalAmount[no] / 1000000;
                kode_j.push(part);
                urutan_j.push(dua_digit_terakhir);
                total_j.push(totalPrincipalAmount[no]);
                no++;
            } 


            
        } else if (digit_awal == 'd_e_f_g_h_i_j') {
            // Lakukan sesuatu jika digit_awal adalah 'd_e_f_g_h_i_j'
            let no = 0; 
            const parts = digit_awal.split('_');
            for (const part of parts) {
              totalPrincipalAmount[no] = totalPrincipalAmount[no] / 1000000;
                kode_j.push(part);
                urutan_j.push(dua_digit_terakhir);
                total_j.push(totalPrincipalAmount[no]);
                no++;
            } 
        }
        
        //console.log(totalPrincipalAmount[0]);
        //console.log(totalPrincipalAmount[1]);
          //console.log("file oo:", `${key}: `+data['data'][key]['PRINCIPALAMOUNT']);
        });

        const data_hasil = {
          kode: kode_j,
          urutan: urutan_j,
          hasil: total_j
      };
        console.log('data akhir'+ JSON.stringify(data_hasil));
        setLoading(false);

        data_hasil.kode.forEach((kode, index) => {
          const id = kode + data_hasil.urutan[index]; // ID sudah ditentukan
          const div = document.getElementById(id); // Get div element by ID

          

          if (div) {
            const currentValue = parseFloat(div.innerText)
            const newValue = currentValue + data_hasil.hasil[index]
            console.log(id+' data '+ newValue+' xxx '+currentValue);
            div.innerText = newValue.toFixed(2); 
          }
        });

        //console.log('data akhir'+ data_hasil);
        // Handle response data here
      } else {
        // If the response is not okay, throw an error
        throw new Error("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  function parseFileName(fileName:any) {
    const pecahan = fileName.split(".");
    const pecahan0 = pecahan[0].split("_");
    const nilai_terakhir = pecahan0[pecahan0.length - 1];
    const dua_digit_terakhir = nilai_terakhir.slice(-2);

    const digit_awal = pecahan[0].split("-");
    
    return {
        pecahan,
        pecahan0,
        nilai_terakhir,
        dua_digit_terakhir,
        digit_awal
    };
}
  
function filterDepositoByDate(startDate: string, endDate: string): number {
  let filteredDeposits: number = 0;

  const creationDate: Date = new Date(startDate);
  const end: Date = new Date(endDate);

  const diffTime: number = Math.abs(end.getTime() - creationDate.getTime());
  const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 30) {
      filteredDeposits = 1;
  }

  return filteredDeposits;
}


function calculateAmortizationPayment(principalAmount: number, startDate: Date, endDate: Date): number {
  const diffTime: number = Math.abs(endDate.getTime() - startDate.getTime());
  const diffMonths: number = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30)); // Difference in months

  if (diffMonths === 0) {
      return principalAmount;
  }

  const amortizationPayment: number = principalAmount / diffMonths;
  return amortizationPayment;
}

function selisihbulan(startDate: string, endDate: string): number {
  // Mengonversi string startDate dan endDate menjadi objek Date
  const startDateTime: Date = new Date(startDate);
  const endDateTime: Date = new Date(endDate);

  // Menghitung selisih bulan antara startDate dan endDate
  const diffMonths: number = (endDateTime.getFullYear() - startDateTime.getFullYear()) * 12 + (endDateTime.getMonth() - startDateTime.getMonth());

  return diffMonths;
}

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    setFiles(fileList);
  };

  return (
    <>
      <button className="btn" onClick={handleShow}>Open Modal</button>

      <dialog id="my_modal_4" className="modal" ref={ref}>
        <div className="modal-box w-8/12 max-w-5xl">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Click the button below to close</p>
          <div className="modal-action float-left">
            <form method="dialog" id="uploadForm" encType="multipart/form-data">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              <div className="space-y-4">
                <label className="input input-bordered flex items-center gap-5">Upload File</label>
                <input type="file" className="file-input file-input-bordered file-input-md w-full max-w-xs" aria-required="true" id="fileToUpload" name="fileToUpload[]" multiple onChange={handleFileChange} />
                <div className="b-overlay-wrap position-relative">
                  <button type="button" id="uploadButton" className="btn btn-primary btn-block rounded-pill" onClick={handleUpload}>Hitung</button>
                  {loading && <div className="loading-overlay">Loading...</div>}
                </div>
                <button className="btn">Close</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default CustomModal;
