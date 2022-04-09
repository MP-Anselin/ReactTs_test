import React from "react";
import {Product} from "../models/Product";
import SingleTodo from "./SingleTodo";

interface props {
    tiltle: string;
    finalPrice?: number;
    setCartPrice?: React.Dispatch<React.SetStateAction<number>>;
    cartProducts?: Product[];
    setCartProducts?: React.Dispatch<React.SetStateAction<Array<Product>>>;
}

const TodoList: React.FC<props> = ({
                                       tiltle,
                                       finalPrice,
                                       cartProducts,
                                       setCartPrice,
                                       setCartProducts,
                                   }) => {

    return (
        <div className="container">
            <div className={`todos  dragactive"`}>
                <span className="todos__heading">{tiltle}</span>
                {cartProducts?.map((product, index) => (
                    <SingleTodo
                        index={index}
                        todos={cartProducts}
                        todo={product}
                        key={product.idDate}
                        setCartPrice={setCartPrice}
                        setTodos={setCartProducts}
                    />
                ))}
                <br/>
                <br/>
                <br/>
                {finalPrice ? <span className="todos__heading">Cart Price: {finalPrice} €</span> : <span/>}
            </div>
        </div>
    );
};

export default TodoList;
