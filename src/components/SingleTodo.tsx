import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Draggable } from "react-beautiful-dnd";
import { useDeleteProductInCartMutation } from "../apis/cart.api";
import { Product } from "../models/Product";

const SingleTodo: React.FC<{
  index: number;
  todo: Product;
  todos: Array<Product>;
  setTodos: React.Dispatch<React.SetStateAction<Array<any>>>;
}> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.name);
  const [deleteProductInCart] = useDeleteProductInCartMutation();


  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.idDate === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleDelete = async (id: number) => {
    console.log("DEtEELE Prod +> ", todos)
    const element = todos.find((prod: any) => prod.idDate === id)
    console.log("DEEEEEEEEE element => ", element)
    if (element) {
      setTodos(todos.filter((todo) => todo.idDate !== id));
      if (element?._id?.$oid) {
        try {
          await deleteProductInCart({product_id: element._id.$oid})
        } catch (err) {
          console.error(err);
        }
      }
    }
  };

  return (
    <Draggable draggableId={todo.idDate.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.idDate)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todos__single--text">{todo.name}</s>
          ) : (
            <span className="todos__single--text">{todo.name}</span>
          )}
          <div>
            <span className="icon" onClick={() => handleDelete(todo.idDate)}>
              <AiFillDelete />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;
