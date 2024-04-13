import lambdaTester from 'lambda-tester';
import { handler } from '../createProduct';
import { Product } from '../types';

type ProductToCreate = Omit<Product, 'id'>

describe('createProduct', () => {
    it('should create item', async () => {
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

export const format = (source: Record<string, unknown>, {
    shouldTransformValuesToObject = false,
    shouldSanitize = false,
} = {}) => {
    if (!shouldSanitize && !shouldTransformValuesToObject) return source;
    // eslint-disable-next-line prefer-const
    for (let key in source) {
        if (typeof source[key] === 'object' && source[key] !== null) {
            format(source[key] as Record<string, unknown>, { shouldTransformValuesToObject, shouldSanitize });
        } else {
            const value = shouldSanitize ? `${(source[key] as string).slice(0, 3)}**********` : source[key] as string;
            source[key] = shouldTransformValuesToObject ? {
                value,
            } : value;
        }
    }

    return source;
};
