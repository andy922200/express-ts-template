import { Request, Response } from 'express'
import { useAxios } from '../utils/axios'
import { getHttpResponse, showError, appError } from '../utils/mixinTools'

export const demoController = {
  getDogs: async (_req: Request, res: Response) => {
    try {
      const { axios } = useAxios({ baseURL: `https://dog.ceo/api` })

      const { target } = await axios<string>({
        url: 'breeds/image/random',
        method: 'get',
      })

      res.status(200).json(
        getHttpResponse({
          data: target,
        }),
      )
    } catch (error) {
      showError(appError(400, 'api error', `API Error: ${error}`), res)
    }
  },
}
