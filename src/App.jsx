import React, { useEffect, useState } from "react";
import { Item } from "./Item";
import { fetch } from "./fetching";
import { fetchLength } from "./fetching";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import loader from "./styles/icons/loader.png";
import cn from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import check from "./styles/icons/inform.png";

export const App = () => {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [localState, setLocalState] = useState([]);
  const [clearData, setClearData] = useState(false);
  const [count, setCount] = useState(3);
  const [countOfCheckedElement, setCountOfCheckedElement] = useState(0);

  const notify = () =>
    toast.info(
      "Дякую, замовлення прийнято! Ваш менеджер вже сповіщений, будь ласка, очікуйте на зворотній зв'язок.!",
      {
        icon: () => <img src={check} alt="inform" />,
      }
    );

  const classes = cn("box__send-order", {
    "box__send-order-disabled": !Boolean(countOfCheckedElement),
  });

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
        if (elem.id === id) elem.countfColors = value;
        return elem;
      })
    );
  };

  const handleSetData = () => {
    setLocalState([]);
    setClearData((state) => !state);
  };
  const classesForDownloadMore = cn("download-more", {
    "download-more-display-none": dataLength <= count,
  });
  console.log(localState);

  return (
    <div className="box">
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="SUPPERBOX"
      />
      <div className={classes}>
        <button
          onClick={() => {
            notify();
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
      <div className={classesForDownloadMore}>
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
