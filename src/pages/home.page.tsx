import React, {useEffect, useState} from "react";
import "../App.css";
import InputField from "../components/InputField";
import TodoList from "../components/TodoList";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {Todo} from "../models/models";
import {useGetProductsMutation} from "../apis/product.api";
import {selectCurrentUser} from "../slices/auth.slice";
import {useAppSelector} from "../app/hooks";
import {LoginForm} from "../components/auth/login-form/login-form.component";

const HomePage: React.FC = () => {

    const user = useAppSelector((state) => selectCurrentUser(state));

    const [getProducts] = useGetProductsMutation();
    const [products, setProducts] = useState<Array<any>>([]);
    const [todo, setTodo] = useState<string>("");
    const [todos, setTodos] = useState<Array<Todo>>([]);
    const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);

    useEffect(() => {
        console.log("BEFORE home page useEffect products => ", products)

        if (products && !products.length) {
            console.log("home page useEffect products.length => ", products.length)
            console.log("home page useEffect products => ", products)
            getProducts(undefined)
                .then((response: any) => {
                        console.log("reponse => ", response.data)
                        setProducts(response.data)
                    }
                )
                .catch((err) => {
                    console.log(err.message);
                });
        }
    })

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo) {
            setTodos([...todos, {_id: Date.now(), name: todo, isDone: false}]);
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

    console.log("helllo ==> ")

    return (
        /*        <DragDropContext onDragEnd={onDragEnd}>
                        <LoginForm/>
                </DragDropContext>*/
        <DragDropContext onDragEnd={onDragEnd}>
            <span className="heading">Taskify</span>
            <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
            <TodoList
                todos={products}
                setTodos={setTodos}
                CompletedTodos={CompletedTodos}
                setCompletedTodos={setCompletedTodos}
            />
        </DragDropContext>

    );
};

export {HomePage};
