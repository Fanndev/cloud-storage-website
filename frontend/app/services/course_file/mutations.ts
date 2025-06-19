import { destroy, store } from "@/app/actions/upload/action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleMutation, handleMutationError, handleMutationSuccess, handleSettled, MutationOptions, showProcessAlert } from "../base";
import useAxiosAuth from "@/lib/hooks/useAxiosAauth";
import API from "@/common/constant/api-path";
import { FileUploadSchema } from "@/app/types/validations/upload.validation";

interface FileUploadOptions extends MutationOptions {}

const handleFileValidation = (formData: FormData) => {
  const file = formData.get('file') as File;
  const result = FileUploadSchema.safeParse({ file });
  if (!result.success) {
    throw { type: "ValidationError", errors: result.error.format() };
  }
};

const uploadFile = async (formData: FormData, showProcessAlert: boolean, serverAction: boolean, axiosAuth: any) => {
  handleFileValidation(formData);
  return handleMutation(
    () => (serverAction ? store(formData) : axiosAuth.post(API.FILE, formData)),
    showProcessAlert,
    "Uploading File",
    "File sedang diunggah"
  );
};

export const useUploadFile = (options: FileUploadOptions = {}) => {
  const queryClient = useQueryClient();
  const { showProcessAlert = true, showAlert = true, serverAction = true } = { 
    showProcessAlert: true, 
    showAlert: true, 
    serverAction: true, 
    ...options 
  };
  const axiosAuth = useAxiosAuth();

  return useMutation({
    mutationFn: (data: FormData) => uploadFile(data, showProcessAlert, serverAction, axiosAuth),
    onSettled: async (_, error) => handleSettled(error, queryClient, ["files"], showAlert),
    onError: (error: any) => handleMutationError(error, showAlert, "File gagal diunggah"),
    onSuccess: (res: any) => handleMutationSuccess(res, showAlert),
  });
};

const deleteFile = async (id: number | null, action: () => Promise<any>, alertTitle: string) => {
  try {
    showProcessAlert(alertTitle, "File sedang dihapus..");
    const response = await action();
    if (response?.status) {
      return response;
    } else {
      throw new Error(`File gagal dihapus: ${response.statusText}`);
    }
  } catch (error) {
    throw new Error(`File gagal dihapus: ${error}`);
  }
};

export const useDeleteFile = (id: number | null, options: FileUploadOptions = {}) => {
  const queryClient = useQueryClient();
  const { showAlert = true } = { showAlert: true, ...options };

  return useMutation({
    mutationFn: () => deleteFile(id, () => destroy(id), "Deleting File"),
    onSettled: async (_, error) => handleSettled(error, queryClient, ["files"], showAlert),
    onError: (error: any) => handleMutationError(error, showAlert, "File gagal dihapus"),
    onSuccess: (res: any) => handleMutationSuccess(res, showAlert),
  });
};