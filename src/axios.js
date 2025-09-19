import axios from 'axios';


const apiUrl = process.env.REACT_APP_API_URL;
const instance = axios.create({
  baseURL: apiUrl,
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get your JWT token from session storage or wherever you store it
    console.log("=============Token=============", token);

    if (token) {
      const parts = token.split('.');
      const decodedPayload = atob(parts[1]);

      const parsedPayload = JSON.parse(decodedPayload);
      const { exp } = parsedPayload;
      const currentTime = Math.floor(Date.now() / 1000);
      if (exp && currentTime >= exp) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload();
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;