import { createFutureApi } from './api'
import type { HttpTransport } from './api'
import type { BackendHealth } from './contracts'

const DEFAULT_API_URL = 'http://localhost:8000'

export class FetchHttpTransport implements HttpTransport {
  private readonly baseUrl: string

  constructor(baseUrl = import.meta.env.VITE_API_URL || DEFAULT_API_URL) {
    this.baseUrl = baseUrl.replace(/\/$/, '')
  }

  async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, init)
    if (!response.ok) {
      throw new Error(`Backend request failed (${response.status})`)
    }
    return response.json() as Promise<T>
  }
}

const http = new FetchHttpTransport()

export const groundroidHttpApi = createFutureApi(http, {
  subscribe: () => () => undefined,
})

export function getBackendHealth(): Promise<BackendHealth> {
  return http.request<BackendHealth>('/health')
}
