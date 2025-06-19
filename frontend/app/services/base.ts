import { QueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { AnyZodObject } from "zod";

export interface MutationOptions {
    serverAction?: boolean;
    showProccessAlert?: boolean;
    showAlert?: boolean;
}

export interface DataTableOptions {
    page: number;
    remove_pagination?: boolean;
    fields?: string | null;
    ordering?: string;
    enabled?: any;
}

export const showProcessAlert = (title: string = "Please Wait", text: string = "Permintaan anda sedang di proses..") => {
    Swal.fire({
        title,
        text,
        iconHtml: '<i class="bx bx-loader-circle bx-spin bx-lg border-0">',
        showConfirmButton: false,
        allowOutsideClick: false,
    });
};
export const proccessing = (title: string = "Please wait", text: string = "Permintaan anda sedang di proses..") => {
    Swal.fire({
        title: title,
        text: text,
        iconHtml: '<i class="bx bx-loader-circle bx-spin bx-lg border-0">',
        showConfirmButton: false,
        allowOutsideClick: false,
    });
};

export const showAlertDialog = (title: string, text: string, icon: "success" | "error") => {
    Swal.fire({
        title,
        text,
        icon,
    });
};

export const successMessage = (res: any, title: string = "Success", text: string = "Data berhasil disimpan") => {
    if (res?.errors) {
        const errorMessage = res.errors?.detail || "Pastikan data yang diinputkan telah sesuai";
        showAlertDialog("Gagal", errorMessage, "error");
        return res;
    } else if (res?.errors_message) {
        showAlertDialog("Gagal", res.errors_message, "error");
        return res;
    }

    showAlertDialog(title, text, "success");
};

export const errorMessage = (res: any, title: string = "Gagal", text: string = "Permintaan gagal dilakukan") => {
    Swal.close();
    const errorText = res?.response?.data?.errors ? "Pastikan data yang diinputkan telah sesuai" : res?.response?.data?.message || text;
    showAlertDialog(title, errorText, "error");
    return res?.response?.data || res;
};

export const handleMutationError = (error: any, showAlert: boolean, errorMessage: string) => {
    if (showAlert) {
        Swal.close();
        showAlertDialog("Gagal", errorMessage, "error");
    }
    return error;
};

export const handleMutationSuccess = async (res: any, showAlert: boolean) => {
    if (showAlert) {
        Swal.close();
        return successMessage(res);
    }
    return res;
};

export const validateForm = (scheme: AnyZodObject, formData: any) => {
    const result = scheme.safeParse(formData);
    if (!result.success) {
        return result.error.flatten().fieldErrors
    }
    return null;
};

export const handleSettled = async (error: any, queryClient: QueryClient, queryKey: any, showAlert: boolean) => {
    if (error) {
        if (error.type === "ValidationError") {
            handleMutationError(error, showAlert, "Pastikan data yang diinput telah sesuai");
        } else {
            console.log(`error ${error}`);
        }
    } else {
        await queryClient.invalidateQueries({ queryKey });
    }
};

export const handleMutation = async (action: () => Promise<any>, showProccessAlert: boolean, alertTitle: string, alertMessage: string) => {
    try {
        if (showProccessAlert) showProcessAlert(alertTitle, alertMessage);
        return await action();
    } catch (error) {
        throw error;
    }
};
