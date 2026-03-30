import toast, { Toaster } from "react-hot-toast";

export const useToast = () => {
  const showToast = (message, type) => {
    switch (type) {
      case "success":
        toast.success(message, { duration: 3000 });
        break;
      case "error":
        toast.error(message, { duration: 4000 });
        break;
      case "loading":
        return toast.loading(message); // Trả về ID để đóng sau này
      default:
        toast(message);
    }
  };

  const closeToast = (id) => {
    toast.dismiss(id);
  };

  return { showToast, closeToast };
};

export const Toast = () => (
  <Toaster position="top-center" reverseOrder={false} />
);
export default Toast;
