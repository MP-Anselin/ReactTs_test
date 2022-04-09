import React from "react";
import {AiFillDelete} from "react-icons/ai";
import {useDeleteProductInCartMutation, useGetProductInCartMutation} from "../apis/cart.api";
import {Cart} from "../models/Cart";
import {Product} from "../models/Product";

const SingleTodo: React.FC<{
    index: number;
    todo: Product;
    todos: Product[] | undefined;
    setCartPrice?: React.Dispatch<React.SetStateAction<number>>;
    setTodos?: React.Dispatch<React.SetStateAction<Array<any>>>;
}> = ({index, todo, todos, setCartPrice, setTodos}) => {
    const [deleteProductInCart] = useDeleteProductInCartMutation();
    const [getCartContent] = useGetProductInCartMutation()


    const handleDelete = async (id: number) => {
        if (!todos)
            return;
        const element = todos.find((prod: any) => prod.idDate === id)
        if (setTodos !== undefined && setCartPrice != undefined && element) {
            setTodos(todos.filter((todo) => todo.idDate !== id));
            if (element?._id?.$oid) {
                try {
                    await deleteProductInCart({product_id: element._id.$oid})
                    const content = (await getCartContent(undefined)) as { data: Cart };
                    if (content && content.data) {
                        setCartPrice(content.data.price);
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        }
    };

    return (
        <form className={`todos__single }`}>
            <span className="todos__single--text">{todo.name}</span>
            <div>
                {setCartPrice ? <span className="icon" onClick={() => handleDelete(todo.idDate)}>
              <AiFillDelete/>
            </span> : <span/>}
            </div>
        </form>
    );
};

export default SingleTodo;

function getCartContent(undefined: undefined): { data: Cart; } | PromiseLike<{ data: Cart; }> {
    throw new Error("Function not implemented.");
}

