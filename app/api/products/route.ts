import { connect, getCollection } from "@/utils/db";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";
 

export async function GET() {
    await connect();
    const products = await Product.find();
    return NextResponse.json({ products });
}
 
export async function POST(request :any) {
    const { name, image,price,category } = await request.json();
    
    await connect();

    const newProduct = new Product({ name, image, price, category });

    //await Product.create({ name, image, price, category });

 
    try {
        await newProduct.save();
        return NextResponse.json({ message: "Product Created" }, { status: 201 });
    } catch (err: any) {
        return new NextResponse(err, {
            status: 500,
        });
    }
}
 
export async function DELETE(request :any) {
    const id = request.nextUrl.searchParams.get("id");
    await connect();
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}