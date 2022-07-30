import React, { useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { formatter } from "../utils";

const ProductTracker = ({ products, setProducts }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [addDisable, setAddDisable] = useState(false);
  const [updateDisable, setUpdateDisable] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [cancelDisable, setCancelDisable] = useState(true);

  const expenseRef = useRef(null);
  const quantityRef = useRef(null);
  const amountRef = useRef(null);

  const handlePressEnterAtExpense = (e) => {
    if (e.key === "Enter") {
      quantityRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      amountRef.current.focus();
    } else if (e.key === "ArrowRight") {
      quantityRef.current.focus();
    }
  };

  const handlePressEnterAtQuantity = (e) => {
    if (e.key === "Enter") {
      amountRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      expenseRef.current.focus();
    } else if (e.key === "ArrowRight") {
      amountRef.current.focus();
    }
  };

  const handlePressEnterAtAmount = (e) => {
    if (e.key === "Enter") {
      handleSetEntries();
      expenseRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      quantityRef.current.focus();
    } else if (e.key === "ArrowRight") {
      expenseRef.current.focus();
    }
  };

  const handleSetEntries = (e) => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: name,
        quantity: quantity,
        amount: amount,
      },
    ]);
    handleReset();
  };

  const handleUpdateEntries = () => {
    setProducts(
      products.map((item) =>
        item.id === selectedEntry.id
          ? { ...item, name: name, quantity: quantity, amount: amount }
          : item
      )
    );
    handleReset();
  };

  const handleRemoveEntry = (id) => {
    setProducts(products.filter((products) => products.id !== id));
  };
  const handleReset = () => {
    setName("");
    setQuantity("");
    setAmount("");
    setUpdateDisable(true);
    setAddDisable(false);
    setCancelDisable(true);
  };

  const handleEditEntry = (id) => {
    const entryToEdit = products.find((products) => products.id === id);
    setSelectedEntry(entryToEdit);
    setName(entryToEdit.name);
    setQuantity(entryToEdit.quantity);
    setAmount(entryToEdit.amount);
    setAddDisable(true);
    setUpdateDisable(false);
    setCancelDisable(false);
  };

  return (
    <div>
      <h1>Product List</h1>
      {products.map((student) => (
        <div
          key={student.id}
          className={selectedEntry?.id === student.id ? "selected-entry" : ""}
        >
          <span>
            {student.id}
            {". "}
          </span>
          <span>{student.name} </span>
          <span> {student.quantity} </span>
          <span> available </span>
          <span> {formatter.format(student.amount)} </span>
          <FiEdit
            color="blue"
            onClick={() => {
              handleEditEntry(student.id);
            }}
          />
          <AiFillDelete
            color="red"
            onClick={() => {
              handleRemoveEntry(student.id);
            }}
          />
        </div>
      ))}

      <span>Total - </span>
      <span>
        {formatter.format(products.reduce((a, v) => a + +v.amount, 0))}
      </span>

      <form action="">
        <input
          autoFocus
          placeholder="Enter Product"
          onKeyUp={handlePressEnterAtExpense}
          value={name}
          ref={expenseRef}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
        />

        <input
          onKeyUp={handlePressEnterAtAmount}
          placeholder="Enter Amount"
          value={amount}
          ref={amountRef}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="number"
        />
        <input
          onKeyUp={handlePressEnterAtQuantity}
          value={quantity}
          ref={quantityRef}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          type="number"
        />
        {cancelDisable ? null : <button onClick={handleReset}>x</button>}
      </form>
      {addDisable ? null : (
        <button disabled={addDisable} onClick={handleSetEntries}>
          Add
        </button>
      )}
      {updateDisable ? null : (
        <button disabled={updateDisable} onClick={handleUpdateEntries}>
          Update
        </button>
      )}
      <button
        onClick={() => {
          setProducts([]);
        }}
      >
        Clear all
      </button>
    </div>
  );
};

export default ProductTracker;
