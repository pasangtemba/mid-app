import logo from "./logo.svg";
import "./App.css";
import Register from "./constants/StudentsRegister.js";
import ExpenseTracker from "./constants/ExpenseTracker.js";
import CashflowTracker from "./constants/CashFlowTracker.js";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      {/* { <Register /> } */}
      {/* {<ExpenseTracker /> } */}
      <CashflowTracker />
    </div>
  );
}

export default App;