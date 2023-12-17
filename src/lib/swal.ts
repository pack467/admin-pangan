import Swal from "sweetalert2";

export const swalError = (err: any) => {
  Swal.fire({
    icon: "error",
    text: err,
  });
};
