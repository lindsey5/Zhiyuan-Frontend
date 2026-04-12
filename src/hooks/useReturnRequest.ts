import { useMutation } from "@tanstack/react-query";
import { returnRequestService } from "../service/returnRequestService";

export const useReturnRequest = () => {
    const updateAllReturnRequestItems = useMutation({
        mutationFn: returnRequestService.updateAllReturnRequestItems,
    });

    return {
        updateAllReturnRequestItems
    };
};
