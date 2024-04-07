import { NotFoundError } from '../errors';
import { Products } from '../repository';
import { Product } from '../models';
import Stock from './Stock';

const getAll = async (): Promise<Product[]> => Products.getAll();

const getById = async (productId: string): Promise<Product> => {
    if (!productId) {
        throw new NotFoundError('Not Found');
    }

    const productFound = await Products.getOne({ id: productId });

    if (!productFound) {
        throw new NotFoundError('Not Found');
    }

    return productFound;
};

const createOne = async (product: Product):Promise<Product> => {
    const createdProduct = await Products.createOne(product);
    const { id: product_id } = createdProduct;

    await Stock.createOne({ product_id, count: product.count });

    return {
        ...createdProduct,
        count: product.count,
    };
};

export default {
    getAll,
    getById,
    createOne,
};
