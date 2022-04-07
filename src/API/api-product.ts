import http from "./http-common";
import ProductInterface from "../interface/product.interface";

const getAll = () => {
    return http.get<Array<ProductInterface>>("/products");
};

const get = (id: any) => {
    return http.get<ProductInterface>(`/product/${id}`);
};

const ProductService = {
    getAll,
    get,
};
export default ProductService;