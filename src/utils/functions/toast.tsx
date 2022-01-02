import { toast } from "react-toastify";

export const errorMsg = (msg: string) => toast.error(msg, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
});

export const succesMsg = (msg:string) => toast.success(msg, {
    position: "top-right",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
})