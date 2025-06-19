export const errorActionResponse = (err: any) => {
    if (err?.response?.status == 401) {
        return { errors: "Error", error_message: `Unauthenticated.` };
    }
    if (err?.response?.status == 403) {
        return { errors: "Error", error_message: err?.response?.data?.message }
    }
    if (err?.response?.data?.errors && Object.keys(err?.response?.data?.errors).length > 0 && !err?.response?.data?.errors?.detail) {
        return {
            errors: err?.response?.data?.errors
        }
    } else if (err?.response?.data?.message) {
        return {
            errors: "Error",
            error_message: err?.response?.data?.message
        }
    } else {
        return {
            errors: "Error",
            error_message: "something went wrong. Try again in a few minutes"
        }
    }
}