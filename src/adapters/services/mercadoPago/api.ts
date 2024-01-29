/* eslint-disable no-param-reassign */
import axios from "axios";
import { env } from "config/env";

const api = axios.create({
  baseURL: env.MERCADO_PAGO_API_HOST,
});

api.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${env.MERCADO_PAGO_BEARER_TOKEN}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
