import { createClient } from "../client";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";

interface UploadProps {
  file: File;
  bucket: string;
  folder?: string;
}

function getStorage() {
  const { storage } = createClient();
  return storage;
}

export async function uploadImage({ file, bucket, folder }: UploadProps) {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, {
      maxSizeMB: 3,
    });
  } catch (error) {
    console.error(error);
    return { media: "", error: "Image compression failed" };
  }

  const storage = getStorage();

  const { data, error } = await storage.from(bucket).upload(path, file);

  if (error) {
    return { media: "", error: "Imagem upload falhou" };
  }

  const media = `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${data?.path}`;

  return { media, error: "" };
}
