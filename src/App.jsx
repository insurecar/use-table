import React, { useEffect, useState } from "react";
import { Item } from "./Item";
import { fetch } from "./fetching";
import { fetchLength } from "./fetching";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import loader from "./styles/icons/loader.png";

export const App = () => {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [localState, setLocalState] = useState([]);
  const [clearData, setClearData] = useState(false);
  const [count, setCount] = useState(5);
  const [countOfCheckedElement, setCountOfCheckedElement] = useState(0);

  useEffect(() => {
    fetch(count).then((data) => {
      setData(data.data);
    });
    // }, [count, JSON.stringify(data)]);
  }, [count]);

  useEffect(() => {
    fetchLength().then(({ data: { length } }) => setDataLength(length));
  }, []);

  useEffect(() => {
    setCountOfCheckedElement(localState.length);
  }, [localState.length]);

  const handleChangeCheckbox = (element) => {
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
        if (elem.id === id) elem.address = value;
        return elem;
      })
    );
  };

  const handleSetData = () => {
    setLocalState([]);
    setClearData((state) => !state);
  };

  // console.log("Кількість вибрани елементів складає", countOfCheckedElement);

  console.log("Довжина вибраних елементів", countOfCheckedElement);

  return (
    <div className="box">
      <div className="box__send-order">
        <button
          onClick={() => {
            handleSetData();
            fetch(count).then(({ data }) => setData(data));
          }}
          disabled={!Boolean(countOfCheckedElement)}
        >
          Повторити обрані замовлення
        </button>
      </div>

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
                handleCheckbox={handleChangeCheckbox}
                handleInput={handleInput}
                clearData={clearData}
                key={elem.id}
              />
            );
          })}
        </tbody>
      </table>
      <div className="download-more">
        <button
          onClick={() => setCount(count + 3)}
          disabled={dataLength <= count}
        >
          <div>
            <img src={loader} alt="loader" />
          </div>
          Показати ще
        </button>
      </div>

      {/* <input type="date" value="" /> */}
      <DatePicker minDate={new Date()} showDisabledMonthNavigation />
    </div>
  );
};
