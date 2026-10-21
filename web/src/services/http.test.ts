import { afterEach, describe, expect, it, vi } from 'vitest'

import { FetchHttpTransport, getBackendHealth } from './http'

describe('FetchHttpTransport', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('sends JSON requests to the configured backend URL', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify({ data: 'ok' }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }))
    vi.stubGlobal('fetch', fetchMock)

    const transport = new FetchHttpTransport('http://localhost:8000/')
    const result = await transport.request<{ data: string }>('/health')

    expect(fetchMock).toHaveBeenCalledWith('http://localhost:8000/health', undefined)
    expect(result).toEqual({ data: 'ok' })
  })

  it('throws a useful error for failed responses', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response('Database unavailable', { status: 503 })))
    const transport = new FetchHttpTransport('http://localhost:8000')

    await expect(transport.request('/health')).rejects.toThrow('Backend request failed (503)')
  })
})

describe('getBackendHealth', () => {
  afterEach(() => vi.unstubAllGlobals())

  it('returns the SQLite health response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(new Response(
      JSON.stringify({ status: 'ok', database: 'sqlite' }),
      { status: 200, headers: { 'content-type': 'application/json' } },
    )))

    await expect(getBackendHealth()).resolves.toEqual({ status: 'ok', database: 'sqlite' })
  })
})
