import axios, {AxiosRequestHeaders} from "axios";

export const getInstance = () => {
  const token = window.localStorage.getItem('token')
  const headers: AxiosRequestHeaders = {
    'Content-Type': 'application/json'
  }
  if (token) {
    headers['Authorization'] = 'Token ' + token
  }
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    headers,
  });
}
