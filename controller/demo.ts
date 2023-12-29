import { Request, Response } from 'express'
import request from '../utils/axios'
import { getHttpResponse, handleErrorAsync } from '../utils/mixinTools'

export const demoController = {
  getDogs: handleErrorAsync(async (_req: Request, res: Response) => {
    const { target } = await request<string>({
      url: 'breeds/image/random',
      method: 'get',
    })

    res.status(200).json(
      getHttpResponse({
        data: target,
      }),
    )
  }),
}
