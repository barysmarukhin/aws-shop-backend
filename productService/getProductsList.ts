import ProductsService from './services/Product';

export const handler = async () => {
  try {
    const products =  await ProductsService.getAll();

    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };
  } catch (e) {
    console.log(e.message);
  }
};
