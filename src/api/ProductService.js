import client from '../libs/HttpClient';

class ProductService {
  static productlist(params) {
    return client.get('product/list', { params });
  }
  static productdetail(params) {
    return client.get(`product/detail/${params.product_id}`, { params });
  }
}
export { ProductService };
