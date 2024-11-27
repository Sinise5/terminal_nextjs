import mongoose, { Schema } from "mongoose";
 
const topicSchema = new Schema(
    {
        idf_sitb_ik: { type: String, required: true },
        kd_prov: { type: Number, required: true },
        provinsi: { type: String, required: true },
        kd_kab: { type: Number, required: true },
        kabupaten: { type: String, required: true },
        fasyankes_id: { type: Number, required: true },
        kode_yankes: { type: String, required: true },
        fasyankes: { type: String, required: true },
        person_id: { type: String, required: true },
        nama: { type: String, required: true },
        tanggal_lahir: { type: String, required: true },
        umur: { type: Number, required: true },
        alamat: { type: String, required: true },
        no_terduga: { type: String, required: true },
        tgl_hasil_diagnosis: { type: String, required: true },
        hasil_diagnosis: { type: String, required: true },
        jenis_kelamin_id: { type: Number, required: true },
        tipe_diagnosis: { type: String, required: true },
        last_edit: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);
 
const t_sitb_ik = mongoose.models.t_sitb_ik || mongoose.model("t_sitb_ik", topicSchema);
 
export default t_sitb_ik;