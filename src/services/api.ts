import axios, { AxiosError } from 'axios'
import { env } from '../../env'

const api = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
})

function handleRequestError(error: AxiosError) {
  if (error.response) {
    console.error(
      '🚀 file: api.ts ~ Error server response: ',
      error.response.data,
    )
    throw error.response.data
  } else if (error.request) {
    console.error('🚀 file: api.ts ~ Without server response: ', error.request)
    throw new Error(`Without server response: ${JSON.stringify(error.request)}`)
  } else {
    console.error(
      '🚀 file: api.ts ~ Error configuring the request: ',
      error.message,
    )
    throw new Error(`Without server response: ${error.message}`)
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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('@GoBarber:token')
        const response = await api.post('/auth/refresh', {
          refreshToken: refreshToken,
        })

        const { access_token } = response.data
        localStorage.setItem('accessToken', access_token)

        originalRequest.headers.Authorization = `Bearer ${access_token}`
        return api(originalRequest)
      } catch (refreshError) {
        console.error('Erro ao atualizar o token:', refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
