import lambdaTester from 'lambda-tester';
import { handler } from '../createProduct';
import { Product } from '../types';

type ProductToCreate = Omit<Product, 'id'>;

describe('createProduct', () => {
  it.skip('should create item', async () => {
    try {
      const data: ProductToCreate = {
        title: 'Test',
        description: 'Test',
        count: 1,
        price: 1,
      };

      return lambdaTester(handler)
        .event({
          body: JSON.stringify(data),
        })
        .expectResult(({ statusCode, body }) => {
          expect(statusCode).toEqual(200);
          expect(body).toBeDefined();
          expect(body.id).not.toBeUndefined();
        });
    } catch (e) {
      console.error(e);
    }
  });
  it('should throw an Error when invalid data passed', async () => {
    try {
      const data: ProductToCreate = {
        title: null,
        description: 'Test',
        count: 1,
        price: 1,
      };

      return lambdaTester(handler)
        .event({ body: JSON.stringify(data) })
        .expectResult(({ statusCode }) => {
          expect(statusCode).toEqual(400);
        });
    } catch (e) {
      console.error(e);
    }
  });
});
