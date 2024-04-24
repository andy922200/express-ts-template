import { useAxios } from '../utils/axios'

export const fetchFromDogAPI = async ({ url, method }: { url: string; method: string }) => {
  const { axios } = useAxios({ baseURL: `https://dog.ceo/api` })

  const { target } = await axios<Record<string, any>>({
    url,
    method,
  })

  return target
}
