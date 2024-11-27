import { connect, getCollection } from "@/utils/db";
import Product from "@/models/ProductModel";
import { NextResponse } from "next/server";
 
export async function PUT(request :any, { params } :any) {
    const { id } = params;
    const { newName: name, newImage: image, newPrice: price, newCategory: category } = await request.json();
    await connect();
    await Product.findByIdAndUpdate(id, { name, image, price, category});
    return NextResponse.json({ message: "Product updated" }, { status: 200 });
}
 
export async function GET(request :any, { params } :any) {
    const { id } = params;
    await connect();
    const product = await Product.findOne({ _id: id });
    return NextResponse.json({ product }, { status: 200 });
}