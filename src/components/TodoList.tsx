import React from "react";
import SingleTodo from "./SingleTodo";
import {Droppable} from "react-beautiful-dnd";
import {Product} from "../models/Product";

interface props {
    todos: Array<Product>;
    setTodos: React.Dispatch<React.SetStateAction<Array<Product>>>;
}

const TodoList: React.FC<props> = ({
                                       todos,
                                       setTodos,
                                   }) => {

    console.log("TodoList INFO todos => ", todos)
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided: any, snapshot: any) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Active Tasks</span>
                        {todos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todos={todos}
                                todo={todo}
                                key={todo.idDate}
                                setTodos={setTodos}
                            />
                        ))}
                        {provided.placeholder}
                        <br/>
                        <br/>
                        <br/>
                        <span className="todos__heading">Cart Price: 0</span>
                    </div>

                )}
            </Droppable>
        </div>
    );
};

export default TodoList;
