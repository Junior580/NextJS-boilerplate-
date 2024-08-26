import axios, { AxiosError, AxiosInstance } from 'axios'

class HttpRequest {
  private static instance: AxiosInstance

  private constructor() {}

  public static getInstance(): AxiosInstance {
    if (!HttpRequest.instance) {
      HttpRequest.instance = axios.create({
        baseURL: 'http://localhost:3333/api',
        // baseURL: process.env.API_URL,
        withCredentials: true,
      })

      HttpRequest.instance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => HttpRequest.handleRequestError(error),
      )

      HttpRequest.instance.interceptors.request.use(
        (config) => config,
        (error: AxiosError) => HttpRequest.handleRequestError(error),
      )
    }
    return HttpRequest.instance
  }

  private static handleRequestError(error: AxiosError) {
    if (error.response) {
      console.error(
        '🚀 file: api.ts ~ Error server response: ',
        error.response.data,
      )
      throw new Error('Error server response')
    } else if (error.request) {
      console.error(
        '🚀 file: api.ts ~ Without server response: ',
        error.request,
      )
      throw new Error('Without server response')
    } else {
      console.error(
        '🚀 file: api.ts ~ Error configuring the request: ',
        error.message,
      )
      throw new Error('Without server response')
    }
  }
}

export default HttpRequest.getInstance()
