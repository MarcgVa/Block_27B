import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBalance } from "./transactionsSlice";
import { transfer, withdrawal, deposit } from "./transactionsSlice";
import "./transactions.scss";

/**
 * Allows users to deposit to, withdraw from, and transfer money from their account.
 */
export default function Transactions() {
  // TODO: Get the balance from the Redux store using the useSelector hook
  const balance = useSelector(selectBalance);
  
  const dispatch = useDispatch();
  const [amountStr, setAmountStr] = useState("0.00");
  const [recipient, setRecipient] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  /** Dispatches a transaction action based on the form submission. */
  const onTransaction = (e) => {
    e.preventDefault();

    // This changes depending on which button the user clicked to submit the form.
    // It will be either "deposit", "withdraw", or "transfer".
    const action = e.nativeEvent.submitter.name;

    const amount = +amountStr;

    // TODO: Dispatch the appropriate transaction action based on `action`
    // if (action === "transfer") {
    //   // The `transfer` action is dispatched with a payload containing
    //   // the amount and the recipient.
    //   dispatch(transfer({ amount, recipient }));
    // }
    switch (action) {
      case 'transfer':
        dispatch(transfer({ amount, recipient }));
        break;
      case 'withdraw':
        dispatch(withdrawal({ amount }));
        break;
      case 'deposit':
        dispatch(deposit({ amount }));
        break;
      default:
        break;
    }

  };
  const handleOnChange = (e) => {
    console.log(e.target.name);
    if (e.target.name === 'recipient') {
      setRecipient(e.target.value);
    } else if (e.target.name === 'amount') {
     setAmountStr(e.target.value); 
    }

    amountStr > balance ? setDisableBtn(true) : setDisableBtn(false);
    
  }
  return (
    <section className="transactions container">
      <h2>Transactions</h2>
      <figure>
        <figcaption>Current Balance &nbsp;</figcaption>
        <strong>${balance.toFixed(2)}</strong>
      </figure>
      <form onSubmit={onTransaction}>
        <div className="form-row">
          <label>
            Amount
            <input
              name="amount"
              type="number"
              inputMode="decimal"
              min={0}
              step="0.01"
              value={amountStr}
              onChange={handleOnChange}
            />
          </label>
          <div>
            <button default name="deposit">
              Deposit
            </button>
            <button name="withdraw" disabled={disableBtn}>
              Withdraw
            </button>
          </div>
        </div>
        <div className="form-row">
          <label>
            Transfer to
            <input
              placeholder="Recipient Name"
              name="recipient"
              value={recipient}
              onChange={handleOnChange}
            />
          </label>
          <button name="transfer" disabled={disableBtn}>
            Transfer
          </button>
        </div>
      </form>
    </section>
  );
}
