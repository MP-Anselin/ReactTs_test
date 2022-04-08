import React from "react";
import {Droppable} from "react-beautiful-dnd";
import ProductInterface from "../../interface/product.interface";
import ProductCard from "./product-card";

interface props {
    newProduct: ProductInterface;
    products: Array<any>;
    setProducts: React.Dispatch<React.SetStateAction<Array<any>>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<any>>>;
    CompletedTodos: Array<any>;
}

const ProductList: React.FC<props> = ({
                                          newProduct,
                                          products,
                                          setProducts,
                                          CompletedTodos,
                                          setCompletedTodos,
                                      }) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Active Tasks</span>
                        {products?.map((product, index) => (
                            <ProductCard
                                newProduct={newProduct}
                                index={index}
                                products={products}
                                product={product}
                                key={product._id}
                                setProducts={setProducts}
                                isEditable={false}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>{/*
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`todos  ${
                            snapshot.isDraggingOver ? "dragcomplete" : "remove"
                        }`}
                    >
                        <span className="todos__heading">Completed Tasks</span>
                        {CompletedTodos?.map((todo, index) => (
                            <ProductCard
                                newProduct={newProduct}
                                index={index}
                                products={CompletedTodos}
                                product={todo}
                                key={todo._id}
                                setProducts={setCompletedTodos}
                                isEditable={true}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>*/}
        </div>
    );
};

export default ProductList;
