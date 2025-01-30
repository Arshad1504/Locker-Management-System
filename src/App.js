import logo from "./logo.svg";
import "./App.css";
import Locker from "./My components/Locker";
import React, { useState, useEffect, Fragment } from "react";

const getStoredValue = (key, defaultValue) => {
  const savedValue = localStorage.getItem(key);
  return savedValue ? JSON.parse(savedValue) : defaultValue;
};

const App = () => {
  const [selectedLocker, setSelectedLocker] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [rows, setRows] = useState(() => getStoredValue("rows", 0));
  const [cols, setCols] = useState(() => getStoredValue("cols", 0));
  const [lockers, setLockers] = useState(() => getStoredValue("lockers", []));
  const [inputRows, setInputRows] = useState(() => getStoredValue("rows", 0));
  const [inputCols, setInputCols] = useState(() => getStoredValue("cols", 0));

  // Setting Lockers array first time load
  useEffect(() => {
    const savedLockers = localStorage.getItem("lockers");
    if (savedLockers) {
      setLockers(JSON.parse(savedLockers));
    }
  }, []);

  // [Local] Operation for setting the lockers array.
  useEffect(() => {
    if (lockers.length > 0) {
      localStorage.setItem("lockers", JSON.stringify(lockers));
    }
  }, [lockers]);

  // [Local] Operation for setting the rows and cols.
  useEffect(() => {
    localStorage.setItem("rows", JSON.stringify(rows));
    localStorage.setItem("cols", JSON.stringify(cols));
  }, [rows, cols]);

  // On Generate Lockers Click
  const generateLockers = () => {
    setRows(inputRows);
    setCols(inputCols);
    const newLockers = [];
    for (let r = 0; r < inputRows; r++) {
      for (let c = 0; c < inputCols; c++) {
        newLockers.push({
          id: `${r}-${c}`,
          row: r,
          col: c,
          status: "closed",
        });
      }
    }
    setLockers(newLockers);
  };

  const updateLockerStatus = (id, newStatus) => {
    setLockers(
      lockers.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    setSelectedLocker(null);
  };

  const handleColumnAction = (action) => {
    if (selectedColumn === null) return;

    const updatedLockers = lockers.map((item) => {
      if (item.col === selectedColumn) {
        return { ...item, status: action };
      }
      return item;
    });
    setLockers(updatedLockers);
  };

  return (
    <Fragment>
      <div id="locker-system-setup">
        <h1 style={{ color: "white" }}>Locker System Setup</h1>
        <input
          type="number"
          placeholder="Rows"
          value={inputRows}
          onChange={(e) => {
            setInputRows(parseInt(e.target.value));
          }}
        />
        <input
          type="number"
          placeholder="Columns"
          value={inputCols}
          onChange={(e) => setInputCols(parseInt(e.target.value))}
        />
        <button onClick={generateLockers}>Generate Lockers</button>
      </div>
      <div className="App">
        <h1>Locker Management System</h1>
        <div>
          <button onClick={() => handleColumnAction("open")}>
            Open All in Column
          </button>
          <button onClick={() => handleColumnAction("closed")}>
            Close All in Column
          </button>
          <button onClick={() => handleColumnAction("reserved")}>
            Reserve All in Column
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, 80px)`,
          }}
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <button
              style={{
                backgroundColor: colIndex == selectedColumn ? "green" : "blue",
              }}
              key={colIndex}
              onClick={() => setSelectedColumn(colIndex)}
            >
              Col {colIndex + 1}
            </button>
          ))}

          {lockers.map((locker) => (
            <Locker
              key={locker.id}
              status={locker.status}
              onClick={() => {
                setSelectedLocker(locker.id);
              }}
            />
          ))}
        </div>

        {selectedLocker && (
          <div className="modal">
            <h3>Locker Actions</h3>
            <button onClick={() => updateLockerStatus(selectedLocker, "open")}>
              Open
            </button>
            <button
              onClick={() => updateLockerStatus(selectedLocker, "closed")}
            >
              Close
            </button>
            <button
              onClick={() => updateLockerStatus(selectedLocker, "reserved")}
            >
              Reserve
            </button>
            <button onClick={() => setSelectedLocker(null)}>Cancel</button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default App;
