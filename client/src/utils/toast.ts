import { toast } from "react-toastify";

export const success = (message: string) => {
  toast.success(message, {
    position: "top-right",
    closeOnClick: true,
    pauseOnHover: true,
    theme: "dark",
  });
};

export const failure = (message: string) => {
  toast.error(message, {
    position: "top-right",
    closeOnClick: true,
    pauseOnHover: true,
    theme: "dark",
  });
};
