import axios, { AxiosError } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3333',
  // baseURL: process.env.API_URL,
  withCredentials: true,
})

function handleRequestError(error: AxiosError) {
  if (error.response) {
    console.error(
      '🚀 file: api.ts ~ Error server response: ',
      error.response.data,
    )
    throw new Error('Error server response')
  } else if (error.request) {
    console.error('🚀 file: api.ts ~ Without server response: ', error.request)
    throw new Error('Without server response')
  } else {
    console.error(
      '🚀 file: api.ts ~ Error configuring the request: ',
      error.message,
    )
    throw new Error('Without server response')
  }
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => handleRequestError(error),
)

api.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => handleRequestError(error),
)

export default api
