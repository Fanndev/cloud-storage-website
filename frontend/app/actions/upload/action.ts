'use server'

import { revalidatePath } from "next/cache";
import authAxios from "@/lib/hooks/useAxiosAuthServer";
import { errorActionResponse } from "../base";

const path = '/file/upload/';
export async function store(formData: FormData) {
  const file = formData.get('file') as File;
  
  // Validate file
  if (!file) {
    return errorActionResponse({ message: 'No file provided' });
  }

  // Validate file size (max 10MB)
  const maxSize = 10 * 1024 * 1024; // 10MB in bytes
  if (file.size > maxSize) {
    return errorActionResponse({ message: 'File size exceeds 10MB limit' });
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowedTypes.includes(file.type)) {
    return errorActionResponse({ message: 'Invalid file type. Allowed types: JPEG, PNG, GIF, PDF, DOC, DOCX' });
  }

  const response = await authAxios
    .post(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res:any) => {
      return res.data;
    })
    .catch((err:any) => {
      console.log(err.response.data);
      return errorActionResponse(err);
    });
  revalidatePath("/file/upload");
  return response;
}

export async function destroy(id: number | null) {
  const response = await authAxios
    .delete(`${path}${id}`)
    .then((res:any) => {
      return res.data;
    })
    .catch((err:any) => {
      return errorActionResponse(err);
    });
  return response;
}