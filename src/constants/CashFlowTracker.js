import React, { useState, useRef } from "react";
import { FaTrash } from "react-icons/fa";
import { AiTwotoneEdit } from "react-icons/ai";
import { formatter } from "../utils";
import { toast } from "react-toastify";
import styled from "styled-components";

const ControlLabel = styled.label`
  font-size: 16px;
  padding: 10px;
  border-radius: 10%;
  background: linear-gradient(
    45deg,
    ${(props) => (props.transactionType === "income" ? "#0c415c" : "red")},
    ${(props) => (props.transactionType === "income" ? "#620707" : "#eb7d7d")}
  );
  color: white;
  width: 100px;
  cursor: pointer;
  transition: all 0.5s;
`;
const CashflowTracker = ({ batch, faculty, college, expenses }) => {
  const [entries, setEntries] = useState(expenses || []);

  const [transaction, setTransaction] = useState("");
  const [type, setType] = useState("expense");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const expenseRef = useRef(null);
  const dateRef = useRef(null);
  const amountRef = useRef(null);

  const handlePressEnterAtName = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      dateRef.current.focus();
    }
  };

  const handlePressEnterAtDOB = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      amountRef.current.focus();
    }
  };

  const handlePressEnterAtAddress = (e) => {
    console.log(e);
    if (e.code === "Enter") {
      handleAddEntry();
    }
  };

  const handleAddEntry = () => {
    if (!editMode) {
      setEntries([
        ...entries,
        {
          id: entries.length + 1,
          transaction: transaction,
          date: date,
          amount: amount,
          type,
        },
      ]);
      toast.success("Entry added!!");
    } else {
      setEntries(
        entries.map((en) =>
          en.id === selectedEntry.id ? { ...en, transaction, date, amount } : en
        )
      );
      setEditMode(false);
      setSelectedEntry(null);
    }
    setTransaction("");
    setDate("");
    setAmount("");
    expenseRef.current.focus();
  };

  const handleRemoveEntry = (id)=> {
    setEntries(entries.filter((a) => a.id !== id));
    toast.success("Entry removed!!");
  };

  const handleEditEntry = (entry) => {
    setEditMode(true);
    setSelectedEntry(entry);
    setTransaction(entry.transaction);
    setDate(entry.date);
    setAmount(entry.amount);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedEntry(null);
    setTransaction("");
    setDate("");
    setAmount("");
    expenseRef.current.focus();
  };

  return (
    <div>
      <h1>Cashflow Tracker</h1>
      <div className="entries-container">
        <div className={`header`}>
          <div className="sn">
            <span>SN</span>
          </div>
          <div className="transaction">
            <span>Transaction</span>
          </div>
          <div className="date">
            <span>Date</span>
          </div>
          <div className="amount">
            <span>Amount</span>
          </div>
          <div className="actions"></div>
        </div>
        {entries.map((s) => (
          <div
            key={s.id}
            className={`${
              selectedEntry?.id === s.id ? "selected-entry" : ""
            } entry`}
          >
            <div className="sn">
              <span>{s.id} </span>
            </div>
            <div className="transaction">
              <span>{s.transaction}</span>
            </div>
            <div className="date">
              <span>{s.date}</span>
            </div>
            <div className="amount">
              <span>{formatter.format(s.amount)}</span>
            </div>
            <div className="actions">
              <AiTwotoneEdit
                color="blue"
                size={15}
                onClick={() => handleEditEntry(s)}
              />
              <FaTrash
                color="red"
                size={15}
                onClick={() => handleRemoveEntry(s.id)}
              />
            </div>
          </div>
        ))}
        <div className="entries-summary">
          <div>
            <span>Total Expenses - </span>
            <span>
              {formatter.format(
                entries
                  .filter((a) => a.type === "expense")
                  .reduce((a, v) => a + +v.amount, 0)
              )}
            </span>
          </div>
          <div>
            <span>Total Income - </span>
            <span>
              {formatter.format(
                entries
                  .filter((a) => a.type === "income")
                  .reduce((a, v) => a + +v.amount, 0)
              )}
            </span>
          </div>
          <div>
            <span>Net Balance - </span>
            <span>
              {formatter.format(
                entries.reduce(
                  (a, v) =>
                    v.type === "income" ? a + +v.amount : a - +v.amount,
                  0
                )
              )}
            </span>
          </div>
        </div>
      </div>

      <div className="controls">
        <button onClick={() => setEntries([])} className="btn">
          Clear All
        </button>
        <div>
          <label>Date</label>
          <input
            placeholder="Enter DOB"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            ref={dateRef}
            type="date"
            onKeyUp={handlePressEnterAtDOB}
          />
        </div>
        <ControlLabel transactionType={type}>
          <input
            id="type"
            type="checkbox"
            checked={type === "expense"}
            onChange={(e) => setType(type === "expense" ? "income" : "expense")}
          />
          <span>{type.toUpperCase()}</span>
        </ControlLabel>

        <div>
          <label>Transaction</label>
          <input
            placeholder="Enter transaction"
            onChange={(e) => setTransaction(e.target.value)}
            value={transaction}
            ref={expenseRef}
            onKeyUp={handlePressEnterAtName}
          />
        </div>
        <div className="amount">
          <label>Amount</label>
          <input
            placeholder="Enter Amount"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            type="number"
            ref={amountRef}
            onKeyUp={handlePressEnterAtAddress}
          />
        </div>
        <button onClick={handleAddEntry} className="btn add">
          {editMode ? "Save" : "+Add"}
        </button>
      </div>
      {editMode ? <button onClick={handleCancelEdit}>Cancel</button> : null}
    </div>
  );
};

export default CashflowTracker;