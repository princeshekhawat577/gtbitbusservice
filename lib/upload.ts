import { supabase } from "./supabase";

export async function uploadFile(
  file: File,
  bucket: string
) {

  const fileExt =
    file.name.split(".").pop();

  const fileName =
    `${Date.now()}.${fileExt}`;

  const { error } =
    await supabase.storage
      .from(bucket)
      .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { data } =
    supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

  return data.publicUrl;
}