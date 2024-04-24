import request from 'supertest'
import { fetchFromDogAPI } from '../api/demo'
import app from '../app'

const mockRes = {
  status: 'success',
  data: {
    message: 'https://example.com/image.jpg',
    status: 'success',
  },
}

jest.mock('../api/demo', () => ({
  fetchFromDogAPI: jest.fn().mockImplementation(() => mockRes),
}))

describe('GET /product-details', () => {
  it('should fetch from api.', async () => {
    const {
      status,
      body: { data },
    } = await request(app).get('/demo/dogs')

    expect(status).toBe(200)
    expect(data).toEqual(mockRes)
    expect(fetchFromDogAPI).toHaveBeenCalledTimes(1)
  })
})
