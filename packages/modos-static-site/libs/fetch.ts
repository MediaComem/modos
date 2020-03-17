import fetch from 'isomorphic-unfetch'

export async function customFetch<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}