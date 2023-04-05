import { useCallback, useMemo, useReducer, useState } from "react";
import "./App.css";

function Guest() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(["yohanes", "ray", "febriyanto"]);

  const addingGuest = () => {
    setGuests([...guests, name]);
    setName("");
  };

  const addButton = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <button onClick={addButton}>Count = {count}</button>
      <div style={{ marginTop: 10 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} />
        <button onClick={addingGuest}>Add Guest</button>
        {guests.map((guest) => {
          return <li key={guest}>{guest}</li>;
        })}
      </div>
    </div>
  );
}

function HookUseReducer() {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "SET_NAME":
          return { ...state, username: action.payload };
        case "ADD_NAME":
          return {
            ...state,
            names: [...state.names, state.username],
            username: "",
          };
      }
    },
    {
      names: [],
      username: "",
    }
  );

  return (
    <div>
      <div>
        {state.names.map((name) => {
          return <li key={name}>{name}</li>;
        })}
      </div>
      <input
        value={state.username}
        onChange={(e) =>
          dispatch({ type: "SET_NAME", payload: e.target.value })
        }
      />
      <button onClick={() => dispatch({ type: "ADD_NAME" })}>
        Add username
      </button>
      <div>username : {state.username}</div>
    </div>
  );
}

const HookUseMemo = ({ sortFunc }) => {
  const numbers = [10, 20, 30];
  const names = ["Yohanes", "Ray", "Febryanto"];

  let Total = useMemo(
    () => numbers.reduce((acc, number) => acc + number, 0),
    [numbers]
  );

  console.log("Rerender HookUseMemo");

  let sortedNames = useMemo(() => {
    console.log("Rerender sortedNames");
    return [...names].sort(), [names, sortFunc];
  });

  return (
    <div>
      <div>Names : {names.join(", ")}</div>
      <div>Sorted Names : {sortedNames.join(", ")}</div>
      <div>Total : {Total}</div>
    </div>
  );
};

function App() {
  const [count, setCount] = useState(0);

  const sortFunc = useCallback((a, b) => a - b, []);

  return (
    <div>
      <HookUseMemo sortFunc={sortFunc} />
      <button onClick={() => setCount(count + 1)}>Click me {count}</button>
    </div>
  );
}

export default App;
