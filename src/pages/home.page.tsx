import React, {useEffect, useState} from "react";
import "../App.css";
import InputField from "../components/InputField";
import TodoList from "../components/TodoList";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useGetProductsQuery} from "../apis/product.api";
import {selectCurrentUser} from "../slices/auth.slice";
import {useAppSelector} from "../app/hooks";
import {Product} from "../models/Product";
import {useAddProductInCartMutation} from "../apis/cart.api";

const HomePage: React.FC = () => {

    useAppSelector((state) => selectCurrentUser(state));

    const {data: productDataInfo} = useGetProductsQuery(undefined);
    const [addProductInCart] = useAddProductInCartMutation();
    const [products, setProducts] = useState<Array<any>>([]);
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Array<any>>([]);
    const [CompletedTodos, setCompletedTodos] = useState<Array<any>>([]);

    useEffect(() => {
        function setProdata() {
            if (products && !products.length && productDataInfo) {
                const newList: Array<Product> = [];
                productDataInfo.forEach((prod: Product) => {
                    newList.push({...prod, idDate: Date.now()})
                });
                setProducts(newList);
            }
        }

        setProdata();
    }, [products, productDataInfo])

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();

        if (productDataInfo && todo) {
            const element = productDataInfo.find((prod: Product) => prod.name === todo)
            if (element) {
                setTodos([...todos, {...element, todo, idDate: Date.now(), isDone: false}]);
                if (element?._id?.$oid) {
                    try {
                        await addProductInCart({product_id: element._id.$oid})
                    } catch (err) {
                        console.error(err);
                    }
                }
            }
            setTodo("");
        }
    };

    const onDragEnd = (result: DropResult) => {
        const {destination, source} = result;

        console.log(result);

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        let add;
        let active = todos;
        let complete = CompletedTodos;
        // Source Logic
        if (source.droppableId === "TodosList") {
            add = active[source.index];
            active.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }

        // Destination Logic
        if (destination.droppableId === "TodosList") {
            active.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }

        setCompletedTodos(complete);
        setTodos(active);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <span className="heading">Taskify</span>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
            <TodoList
                todos={todos}
                setTodos={setTodos}
            />
        </DragDropContext>

    );
};

export {HomePage};
