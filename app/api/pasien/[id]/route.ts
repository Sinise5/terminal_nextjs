// Import kelas ObjectId dari mongoose untuk mengonversi ID string ke tipe ObjectId
import { ObjectId } from "mongodb";
import { connect, getCollection } from "@/utils/db";
import { NextResponse } from "next/server";

export async function GET(request: any, { params, query }: any) {
    const { id } = params;
    const { page = 1, size = 10 } = query; // Menangkap parameter halaman dan ukuran halaman
    
    await connect();

    const collection = getCollection("t_sitb_ik");
    
    // Konversi id menjadi tipe ObjectId jika diperlukan
    const queryId = ObjectId.isValid(id) ? new ObjectId(id) : id;
    
    // Query untuk menemukan data pasien berdasarkan kd_prov
    const pasienCursor = collection.find({ "kd_prov": queryId });
    
    // Menghitung total data
    const totalData = await pasienCursor.count();
    
    // Menghitung jumlah halaman
    const totalPages = Math.ceil(totalData / size);
    
    // Menghitung offset untuk query berbasis halaman
    const offset = (page - 1) * size;
    
    // Melakukan query untuk mendapatkan data pada halaman tertentu
    const pasienPage = await pasienCursor.skip(offset).limit(size).toArray();

    // Mengembalikan hasil ke klien
    return NextResponse.json({ pasien: pasienPage, totalPages, currentPage: page }, { status: 200 });
}

/*import { connect, getCollection } from "@/utils/db";
import { NextResponse } from "next/server";
import t_sitb_ik from "@/models/PasienModel";

 
export async function GET(request: any, { params }: any) {
    const { id } = params;
    await connect();

    const collection = getCollection("t_sitb_ik");
    
    var query = {
        "kd_prov": parseInt(id)
    };
    const pasien0 = collection.findOne(query);
    //console.log('Query untuk mencari data pasien:', pasien0.toConstructor());
    const pasien = await pasien0;
    
    return NextResponse.json({ pasien }, { status: 200 });
}
*/