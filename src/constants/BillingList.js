import React, { useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { formatter } from "../utils";

const BillingList = ({ products }) => {
  const [entry, setEntry] = useState([]);
  const [product, setProduct] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [amount, setAmount] = useState(0);
  const [addDisable, setAddDisable] = useState(true);
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
    setEntry([
      ...entry,
      {
        id: entry.length + 1,
        product: product,
        quantity: quantity,
        amount: amount,
      },
    ]);
    handleReset();
  };

  const handleUpdateEntries = () => {
    setEntry(
      entry.map((item) =>
        item.id === selectedEntry.id
          ? { ...item, product: product, quantity: quantity, amount: amount }
          : item
      )
    );
    handleReset();
  };

  const handleRemoveEntry = (id) => {
    setEntry(entry.filter((entry) => entry.id !== id));
  };
  const handleReset = () => {
    setProduct("");
    setQuantity("");
    setAmount("");
    setUpdateDisable(true);
    setAddDisable(false);
    setCancelDisable(true);
  };

  const handleEditEntry = (id) => {
    const entryToEdit = entry.find((entry) => entry.id === id);
    setSelectedEntry(entryToEdit);
    setProduct(entryToEdit.product);
    setQuantity(entryToEdit.quantity);
    setAmount(entryToEdit.amount);
    setAddDisable(true);
    setUpdateDisable(false);
    setCancelDisable(false);
  };

  return (
    <div>
      <h1>Billing List</h1>
      {entry.map((student) => (
        
          
        <div 
          key={student.id}
          className={selectedEntry?.id === student.id ? "selected-entry" : " "}
        >
          <span>
            {student.id}
            {". "}
          </span>
          <span>{student.product} </span>
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
      <span>{formatter.format(entry.reduce((a, v) => a + +v.amount, 0))}</span>

      <form action="">
        <select
          autoFocus
          placeholder="Enter Product"
          onKeyUp={handlePressEnterAtExpense}
          value={selectedProduct}
          ref={expenseRef}
          onChange={async (e) => {
            if (e.target.value === "none") {
              setSelectedProduct(e.target.value);
              handleReset();
              setAddDisable(true);
            } else {
              setSelectedProduct(e.target.value);
              const productId = parseInt(e.target.value);
              const pro = await products.filter((p) => p.id === productId);
              setAmount(pro[0].amount);
              setQuantity(pro[0].quantity);
              setProduct(pro[0].name);
              setAddDisable(false);
            }
          }}
        >
          <option defaultValue value="none">
            None
          </option>
          {products.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          onKeyUp={handlePressEnterAtAmount}
          placeholder="Enter Amount"
          value={amount}
          ref={amountRef}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          disabled={true}
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
          setEntry([]);
          handleReset();
        }}
      >
        Clear all
      </button>
    </div>
  );
};

export default BillingList;
