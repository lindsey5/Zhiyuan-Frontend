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