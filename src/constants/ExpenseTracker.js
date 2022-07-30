import React, { useState, useRef } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { formatter } from "../utils";

const ExpenseTracker = ({ batch, faculty, college, students }) => {
  const [entry, setEntry] = useState(students || []);
  const [expense, setExpense] = useState("");
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();
  const [addDisable, setAddDisable] = useState(false);
  const [updateDisable, setUpdateDisable] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState("");
  const [cancelDisable, setCancelDisable] = useState(true);

  const expenseRef = useRef(null);
  const dateRef = useRef(null);
  const amountRef = useRef(null);

  const handlePressEnterAtExpense = (e) => {
    if (e.key === "Enter") {
      dateRef.current.focus();
    } else if (e.key === "ArrowLeft") {
      amountRef.current.focus();
    } else if (e.key === "ArrowRight") {
      dateRef.current.focus();
    }
  };

  const handlePressEnterAtDate = (e) => {
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
      dateRef.current.focus();
    } else if (e.key === "ArrowRight") {
      expenseRef.current.focus();
    }
  };

  const handleSetEntries = (e) => {
    setEntry([
      ...entry,
      {
        id: entry.length + 1,
        expense: expense,
        date: date,
        amount: amount,
      },
    ]);
    handleReset();
  };

  const handleUpdateEntries = () => {
    setEntry(
      entry.map((item) =>
        item.id === selectedEntry.id
          ? { ...item, expense: expense, date: date, amount: amount }
          : item
      )
    );
    handleReset();
  };

  const handleRemoveEntry = (id) => {
    setEntry(entry.filter((entry) => entry.id !== id));
  };
  const handleReset = () => {
    setExpense("");
    setDate("");
    setAmount("");
    setUpdateDisable(true);
    setAddDisable(false);
    setCancelDisable(true);
  };

  const handleEditEntry = (id) => {
    const entryToEdit = entry.find((entry) => entry.id === id);
    setSelectedEntry(entryToEdit);
    setExpense(entryToEdit.expense);
    setDate(entryToEdit.date);
    setAmount(entryToEdit.amount);
    setAddDisable(true);
    setUpdateDisable(false);
    setCancelDisable(false);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      {entry.map((student) => (
        <div
          key={student.id}
          className={selectedEntry?.id === student.id ? "selected-entry" : ""}
        >
          <span>
            {student.id}
            {". "}
          </span>
          <span>{student.expense} </span>
          <span>{student.date} </span>
          <span>
            {"$"}
            {student.amount}{" "}
          </span>
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

      <span>Total expense - </span>
      <span>{formatter.format(entry.reduce((a, v) => a + +v.amount, 0))}</span>

      <form action="">
        <input
          autoFocus
          placeholder="Enter Expense"
          onKeyUp={handlePressEnterAtExpense}
          value={expense}
          ref={expenseRef}
          onChange={(e) => {
            setExpense(e.target.value);
          }}
          type="text"
        />
        <input
          onKeyUp={handlePressEnterAtDate}
          value={date}
          ref={dateRef}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          type="date"
        />
        <input
          onKeyUp={handlePressEnterAtAmount}
          placeholder="Enter Amount"
          value={amount}
          ref={amountRef}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          type="text"
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
        }}
      >
        Clear all
      </button>
    </div>
  );
};

export default ExpenseTracker;
