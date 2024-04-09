import { InvalidDataError, NotFoundError } from '../errors';
import { Products } from '../repository';
import { Product } from '../types';
import Stock from './Stock';

const getAll = async (): Promise<Product[]> => Products.getAll();

const getById = async (productId: string): Promise<Product> => {
    if (!productId) {
        throw new NotFoundError();
    }

    const productFound = await Products.getOne({ id: productId });

    if (!productFound) {
        throw new NotFoundError();
    }

    return productFound;
};

const createOne = async (product: Product):Promise<Product> => {
    if (!product.title) {
        throw new InvalidDataError();
    }

    const createdProduct = await Products.createOne(product);
    const { id: product_id } = createdProduct;

    await Stock.createOne({ product_id, count: product.count || 0 });

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
