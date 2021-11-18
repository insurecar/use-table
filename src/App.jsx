import React, { useEffect, useState } from "react";
import { Item } from "./Item";
import { fetch } from "./fetching";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

export const App = () => {
  const [data, setData] = useState([]);
  const [localState, setLocalState] = useState([]);
  const [clearData, setClearData] = useState(false);
  const [count, setCount] = useState(5);

  useEffect(() => {
    fetch(count).then((data) => {
      setData(data.data);
    });
    // }, [count, JSON.stringify(data)]);
  }, [count]);

  const handleChange = (element) => {
    const existElement = localState.filter((elem) => element.id === elem.id);
    if (existElement.length) {
      setLocalState(localState.filter((elem) => element.id !== elem.id));
    } else {
      setLocalState([...localState, element]);
    }
  };

  const handleInput = (value, id) => {
    setLocalState(
      localState.map((elem) => {
        if (elem.id === id) elem.country = value;
        return elem;
      })
    );
  };

  const handleSetData = () => {
    setLocalState([]);
    setClearData((state) => !state);
  };

  console.log(moment(1637154341000).format("DD-MM-yyyy"));

  return (
    <div className="box">
      <table className="table">
        <thead>
          <tr className="table__main-tr">
            <th>{""}</th>
            <th>Дата замовлення</th>
            <th>Найменування</th>
            <th>Кількість</th>
            <th>Марка</th>
            <th>Кількість кольорів</th>
            <th>Адреса доставки</th>
            <th>Бажана дата доставки</th>
          </tr>
        </thead>
        <tbody>
          {data.map((elem) => {
            return (
              <Item
                elem={elem}
                handleCheckbox={handleChange}
                handleInput={handleInput}
                clearData={clearData}
                key={elem.id}
              />
            );
          })}
        </tbody>
      </table>
      <button onClick={() => setCount(count + 3)}>Завантажити більше</button>
      <button
        onClick={() => {
          handleSetData();
          fetch(count).then(({ data }) => setData(data));
        }}
      >
        Press Button
      </button>
      {/* <input type="date" value="" /> */}
      <DatePicker minDate={new Date()} showDisabledMonthNavigation />
    </div>
  );
};
