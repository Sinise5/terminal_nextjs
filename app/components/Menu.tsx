"use client"

import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Menu = () => {
    const { data: session, status } = useSession(); // Menggunakan 'status' juga untuk menangani loading state


    return (
        <>
           
  <nav className="flex-none bg-gray-800 text-white w-56 p-2">
    {/* Navbar */}
    <ul className="menu">
      <li className="p-1">
        <Link href="/dashboard" className="btn">Dashboard</Link>
      </li>
      <li className="p-1">
        <Link href="/lcr" className="btn">LCR</Link>
      </li>
      <li className="p-1">
        <details >
          <summary className="btn">Menu 1</summary>
          <ul>
            <li className="p-1"><Link href="/products" className="btn ">Produk</Link></li>
            <li className="p-1"><Link href="/web3" className="btn ">Web 3</Link></li>
            <li>
              <details >
                <summary className="btn">Parent</summary>
                <ul>
                  <li className="p-1"><Link href="/login" className="btn ">Menu 4</Link></li>
                  <li className="p-1"><Link href="/login" className="btn ">Menu 5</Link></li>
                </ul>
              </details>
            </li>
          </ul>
        </details>
      </li>
      <li className="p-1"><Link href="/pasien" className="btn ">Pasien</Link></li>
    </ul>
  </nav>
  
 

        </>
        
    );
};

export default Menu;
