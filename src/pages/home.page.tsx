import React, {useEffect, useState} from "react";
import "../App.css";
import InputField from "../components/InputField";
import TodoList from "../components/TodoList";
import {selectCurrentUser} from "../slices/auth.slice";
import {useAppSelector} from "../app/hooks";
import {Product} from "../models/Product";
import {useAddProductInCartMutation, useGetProductInCartMutation} from "../apis/cart.api";
import {Cart} from "../models/Cart";
import { useGetProductsQuery } from "../apis/product.api";

const HomePage: React.FC = () => {

    useAppSelector((state) => selectCurrentUser(state));

    const {data: productDataInfo} = useGetProductsQuery(undefined);
    const [getCartContent] = useGetProductInCartMutation()
    const [addProductInCart] = useAddProductInCartMutation();

    const [cartProducts, setCartProducts] = useState<Array<any>>([]);
    const [cartPrice, setCartPrice] = useState<number>(0);
    const [todo, setTodo] = useState<string>("");


    const setCartData = async (productDataInfo:  Product[] | undefined) => {
        if (!productDataInfo)
            return;
        try {
            const content = (await getCartContent(undefined)) as { data: Cart };
            const newList: Array<Product> = [];
            productDataInfo.forEach((product) => {
                if (product) {
                    content.data.products.forEach((id) => {
                        if (product._id && id === product._id.$oid)
                            newList.push({...product, idDate: Date.now()})
                    })
                }
            })
            setCartProducts([...newList]);
            if (content && content.data)
                setCartPrice(content.data.price)
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        setCartData(productDataInfo);
    }, [productDataInfo])

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        if (productDataInfo && todo) {
            const element = productDataInfo.find((prod: Product) => prod.name === todo)
            if (element) {
                setCartProducts([...cartProducts, {...element, todo, idDate: Date.now(), isDone: false}]);
                if (element?._id?.$oid) {
                    try {
                        await addProductInCart({product_id: element._id.$oid})
                        const content = (await getCartContent(undefined)) as { data: Cart };
                        setCartProducts([...cartProducts, {...element, todo, idDate: Date.now(), isDone: false}]);
                        if (content && content.data && content.data?.price)
                            setCartPrice(content.data.price)
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
            setTodo("");
        }
    };

    return (
        <div>
            <span className="heading">Shopphing Cart</span>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
            <TodoList
                tiltle={"Product List"}
                cartProducts={productDataInfo}
            />
            <TodoList
                tiltle={"My Cart"}
                finalPrice={cartPrice}
                setCartPrice={setCartPrice}
                cartProducts={cartProducts}
                setCartProducts={setCartProducts}
            />
        </div>

    );
};

export {HomePage};
