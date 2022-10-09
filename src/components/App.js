import React, { useEffect, useRef, useState } from "react";
import { getList, setItem } from "../services/list";
import "./App.css";

function App() {
  const [alert, setAlert] = useState(false);
  const [itemInput, setItemInput] = useState("");
  const [list, setList] = useState([]);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (list.length && alert) {
      return;
    }
    getList().then((items) => {
      if (mounted.current) {
        setList(items);
      }
    });
    return () => (mounted.current = false);
  }, [alert, list]);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        if (mounted.current) {
          setAlert(false);
        }
        setAlert(false);
      }, 1000);
    }
  }, [alert]);

  function handleSubmit(event) {
    event.preventDefault();
    setItem(itemInput).then(() => {
      if (mounted.current) {
        setItemInput("");
        setAlert(true);
      }
    });
  }

  return (
    <div className="App">
      <h1>My Grocery list</h1>
      <ul>
        {list.map((item, index) => (
          <li key={index}>{item.item}</li>
        ))}
      </ul>
      {alert && <h2>Submit Successful</h2>}
      <form onSubmit={handleSubmit}>
        <label>
          <p>New Item</p>
          <input
            type="text"
            onChange={(event) => setItemInput(event.target.value)}
            value={itemInput}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
