/* eslint-disable consistent-this */
import axios from "axios";
import Config from "react-native-config";
const { API_HOST, API_KEY } = Config;

const axiosInstance = axios.create({
  baseURL: `${API_HOST}`,
  timeout: 1000,
  headers: { Authorization: `${API_KEY}` },
});

axiosInstance.interceptors.request.use(
  request => {
    return request;
  },
  error => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;

// type PromiseQueueType = {
//   resolve: Function;
//   reject: Function;
// };

// class AxiosService {
//   isRefreshing = false;
//   failedQueue: PromiseQueueType[] = [];
//   axiosInstance: AxiosInstance | undefined;

//   constructor() {
//     this.init();
//     this.failedQueue = [];
//   }

//   init() {
//     this.axiosInstance = axios.create();
//     this.axiosInstance.interceptors.response.use(
//       response => {
//         return response;
//       },
//       async error => {
//         const originalRequest = error.config;
//         const self = this;
//         if (error?.response?.status === 401 && !originalRequest?._retry) {
//           if (self.isRefreshing) {
//             return new Promise(function (resolve, reject) {
//               self.failedQueue.push({ resolve, reject });
//             })
//               .then((res: any) => {
//                 originalRequest.headers.Authorization = `Bearer ${res?.access_token}`;
//                 return axios(originalRequest);
//               })
//               .catch(err => {
//                 return Promise.reject(err);
//               });
//           }

//           originalRequest._retry = true;
//           self.isRefreshing = true;

//           return Promise.reject(error);
//         }
//         return Promise.reject(error);
//       },
//     );
//   }

//   processQueue = (error: any, token_type?: string, access_token?: string) => {
//     this.failedQueue.forEach(promise => {
//       if (error) {
//         promise.reject(error);
//       } else {
//         promise.resolve({
//           token_type,
//           access_token,
//         });
//       }
//     });
//     this.failedQueue = [];
//   };

//   getAxiosInstance(): AxiosInstance | undefined {
//     return this.axiosInstance;
//   }
// }

// export default new AxiosService();
