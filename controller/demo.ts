import { Request, Response, NextFunction } from 'express'
import { fetchFromDogAPI } from '../api/demo'
import { getHttpResponse, showError, appError } from '../utils/mixinTools'

export const demoController = {
  getDogs: async (_req: Request, res: Response, _next: NextFunction) => {
    try {
      const result = await fetchFromDogAPI({
        url: 'breeds/image/random',
        method: 'get',
      })

      res.status(200).json(
        getHttpResponse({
          data: result,
        }),
      )
    } catch (error) {
      showError(appError(400, 'api error', `API Error: ${error}`), res)
    }
  },
}
