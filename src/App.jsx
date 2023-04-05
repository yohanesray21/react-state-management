import React, { useEffect, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);

  useState(() => {
    const interval = setInterval(() => {
      setTime((t) => {
        console.log(t);
        return t + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <div>Stopwatch : {time}</div>;
};

const App = () => {
  const [names, setNames] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  useEffect(() => {
    fetch(`/names.json`)
      .then((response) => response.json())
      .then((data) => setNames(data));
  }, []);

  useEffect(() => {
    if (selectedName) {
      fetch(`/${selectedName}.json`)
        .then((response) => response.json())
        .then((data) => setSelectedName(data));
    }
  }, [selectedName]);

  return (
    <div>
      <Stopwatch />
      Names : {[...names].join(", ")}
      <div>
        {names.map((name) => (
          <button key={name} onClick={() => setSelectedName(name)}>
            {name}
          </button>
        ))}

        <div>{JSON.stringify(selectedName)}</div>
      </div>
    </div>
  );
};

export default App;
