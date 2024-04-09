import { APIGatewayEvent, Handler } from 'aws-lambda';
import { Product as ProductService } from './services';
import { Product } from './types';
import logger from './logger';
import { ApiError } from './errors';

export const handler: Handler = async (event: APIGatewayEvent) => {
    try {
        logger('createProduct', event);

        const product: Product = JSON.parse(event.body as string);
        const productCreated = await ProductService.createOne(product);

        return {
            body: productCreated,
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (e) {
        const { statusCode = 500, name } = e as ApiError ;

        return {
            body: {
                error: name,
            },
            statusCode: statusCode,
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    }
};
