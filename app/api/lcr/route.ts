
import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import csvParser from 'csv-parser';
import fs from 'fs';

export const POST = async (req: { formData: () => any; }, res: { status: (arg0: number) => any; }) => {
    try {
        const formData = await req.formData();
        const files = formData.getAll("fileToUpload[]");

        if (files.length === 0) {
            return NextResponse.json({ error: "No files received." }, { status: 400 });
        }

        const jsonData: { [key: string]: any } = {};

        const readCSV = (filePath: string) => {
            return new Promise<{ [key: string]: any; }[]>((resolve, reject) => {
                const fileData: { [key: string]: any; }[] = [];
                
                fs.createReadStream(filePath)
                    .pipe(csvParser())
                    .on('data', (data) => fileData.push(data))
                    .on('end', () => {
                        fs.unlinkSync(filePath);
                        resolve(fileData);
                    })
                    .on('error', (error) => {
                        reject(error);
                    });
            });
        };
        

        for (const file of files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const filename = file.name.replaceAll(" ", "_");
            await writeFile(path.join(process.cwd(), "public/assets/", filename), buffer);

            const filePath = path.join(process.cwd(), "public/assets/", filename);
            jsonData[filename] = await readCSV(filePath);
        }

        return NextResponse.json({ message: "Success", status: 201, data: jsonData });
    } catch (error) {
        console.error("Error occurred ", error);
        return NextResponse.json({ message: "Failed " + error, status: 500 });
    }
};
