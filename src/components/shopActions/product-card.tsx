import React, {useEffect, useState} from "react";
import {useRef} from "react";
import {AiFillEdit, AiFillDelete, AiOutlinePlus} from "react-icons/ai";
import {MdDone} from "react-icons/md";
import {Draggable} from "react-beautiful-dnd";
import ProductInterface from "../../interface/product.interface";

const ProductCard: React.FC<{
    newProduct: ProductInterface;
    index: number;
    product: any;
    products: Array<any>;
    setProducts: React.Dispatch<React.SetStateAction<Array<any>>>;
    isEditable: boolean;
}> = ({index, product, products, setProducts, isEditable}) => {
    console.log("product-card product ", product)
    console.log("product-card product._id ", product._id)

    if (isEditable == true)
        console.log("COMPLET TASK product-card product ", product)
    const [edit, setEdit] = useState<boolean>(false);
    const [editProduct, setEditProduct] = useState<string>(product.name);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleDelete = (id: number) => {
        setProducts(products.filter((product) => product._id !== id));
    };

    const handleAddProductInCart = (id: number) => {
        const newProd = products.find((product) => product._id === id);
        console.log("handleAddProductInCart isEditable => ", isEditable)
        console.log("handleAddProductInCart newProduct => ", newProd)
        setProducts([...products, newProd]);
        setProducts(newProd)
    };

    return (
        <Draggable draggableId={product._id.toString()} index={index}>
            {(provided, snapshot) => (
                <form
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
                >
                    <span className="todos__single--text">{product.name}</span>
                    <span/>
                    <span className="todos__single--text">{product.price} €</span>
                    <div>
                        {isEditable ?
                            <span className="icon" onClick={() => handleDelete(product._id)}>
              <AiFillDelete/>
            </span>
                            :
                            <span className="icon" onClick={() => handleAddProductInCart(product._id)}>
              <AiOutlinePlus/>
            </span>
                        }
                    </div>
                </form>
            )}
        </Draggable>
    );
};

export default ProductCard;
