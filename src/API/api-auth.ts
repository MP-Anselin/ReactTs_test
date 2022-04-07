import http from "./http-common";
import ProductInterface from "../interface/product.interface";
import {User} from "../models/User";

const login = (data: any) => {
    return http.post<Array<ProductInterface>>("/login", data);
};
const logOut = (id: any) => {
    return http.get<ProductInterface>(`/logout`);
};
const signup = (data: ProductInterface) => {
    return http.post<ProductInterface>("/signup", data);
};

const LogService = {
    login,
    logOut,
    signup,
};
export default LogService;