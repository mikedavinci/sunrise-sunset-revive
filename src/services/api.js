import axios from "axios";
import Swal from "sweetalert2";

const apiClient = axios.create({
  baseURL: "https://api.sunrise-sunset.org/",
  headers: {
    "Content-Type": "application/json",
  },
});
const requestHandler = async (request) => {
  return request;
};
//TODO:Implment error catching for local storage being empty
apiClient.interceptors.request.use(
  (request) => requestHandler(request),
  (err) => {
    return Promise.reject(err);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (!error.isAxiosError && !error.response) {
      Swal.fire({
        title: "Error",
        text: "Service currently unavailable, please contact support or try again later.",
        icon: "error",
        confirmButtonColor: "#28a745",
        denyButtonColor: "#757575",
        confirmButtonText: "Ok",
        showCancelButton: false,
      });
    }
    if (error.response.status == 500) {
      if (error.response.config.url.indexOf("member") > -1) {
        return Promise.reject(error.response.data);
      } else {
        Swal.fire({
          title: "Error",
          text: "Error received please contact support.",
          icon: "error",
          confirmButtonColor: "#28a745",
          denyButtonColor: "#757575",
          confirmButtonText: "Ok",
          showCancelButton: false,
        });
        return Promise.reject(error.response);
      }
    } else if (error.response.status == 404) {
      if (error.response.config.url.indexOf("member") > -1) {
        return Promise.reject(error.response.data);
      } else {
        Swal.fire({
          title: "No Results",
          text:
            typeof error.response.data === "object"
              ? error.response.data.message
              : error.response.data,
          icon: "info",
          confirmButtonColor: "#28a745",
          denyButtonColor: "#757575",
          confirmButtonText: "Ok",
          showCancelButton: false,
        });
        return Promise.reject(error.response);
      }
    } else if (error.response.status == 409) {
      Swal.fire({
        title: "Error",
        text: error.response.data.title,
        icon: "error",
        confirmButtonColor: "#28a745",
        denyButtonColor: "#757575",
        confirmButtonText: "Ok",
        showCancelButton: false,
      });
      return Promise.reject(error.response);
    }
  }
);
export default apiClient;
