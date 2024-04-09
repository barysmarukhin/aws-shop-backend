import { handler as getProductsList } from '../getProductsList';
import productsMock from '../products.mock';
import { APIGatewayEvent } from 'aws-lambda';

describe('getProductsList', () => {
  test('getProductsList should return array of products', async () => {
    const response = await getProductsList({} as APIGatewayEvent);
    const products = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(products)).toBe(true);
    expect(products).toEqual(productsMock);
  });
});
