import { sileo, type SileoPosition } from "sileo";

export const successToast = (title : string, position: SileoPosition = "top-center") => {
    sileo.success({
        title: title,
        fill: "black",
        position,
        styles: {
            title: "text-white!",
            description: "text-white/75!",
        },
    });
}

export const errorToast = (title : string, position: SileoPosition = "top-center") => {
    sileo.error({
        title: title,
        fill: "black",
        position: position,
        styles: {
            title: "text-white!",
            description: "text-white/75!",
        },
    });
}
export const promiseToast = <T extends { message?: string}>(
    promise: Promise<T>,
    position: SileoPosition = "top-center",
    successTitle?: string,
) => {
    return sileo.promise(promise, {
        position: position,
        loading: { title: "Loading..." },
        success: (data: T) => {
            setTimeout(() => {
                window.location.reload()
            }, 1000)
            return ({
                title: data?.message || successTitle || "Success",
            })
        },
        error: (err: any) => ({
            title: err?.message || "Something went wrong",
        }),
    });
};