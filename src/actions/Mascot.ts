"use server";

import { updateTim } from "@/queries/tim.query";
import { imageUploader } from "./fileUploader";

export async function upsertFotoMascotForm(data: FormData, id: string) {
  const fotoMascot = data.get("fotomascot") as File;

  try {
    let fotoMascotUrl: string | undefined;
    if (fotoMascot.name !== "undefined") {
      const fotoMascotBuffer = await fotoMascot.arrayBuffer();
      const uploadedFotoMascot = await imageUploader(
        Buffer.from(fotoMascotBuffer)
      );
      fotoMascotUrl = uploadedFotoMascot?.data?.url;
    }

    await updateTim({ id }, { foto_mascot: fotoMascotUrl });

    return { success: true, message: "Berhasil memperbarui foto mascot!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal memperbarui foto mascot" };
  }
}
