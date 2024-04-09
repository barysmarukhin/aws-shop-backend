import lambdaTester from 'lambda-tester';
import { handler } from '../getProductsList';
import { Response } from '../../types/api';

describe('getProductsList', () => {
    it('should return data', () => {
        try {
            return lambdaTester(handler)
                .expectResult(({ statusCode, body }: Response) => {
                    expect(statusCode).toEqual(200);
                    expect(body).toBeDefined();
                    expect(body.length).toBeGreaterThan(0);
                });
        } catch (e) {
            console.error(e);
        }
    });
});
