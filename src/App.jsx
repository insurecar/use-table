import React, { useEffect, useState } from "react";
import { Item } from "./Item";
import { fetch } from "./fetching";
import { Loader } from "./Loader";
import { options } from "./arrayOfSelect";
import "react-datepicker/dist/react-datepicker.css";
import loader from "./styles/icons/loader.png";
import cn from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import check from "./styles/icons/inform.png";
import { newDate } from "./fetching";

export const App = () => {
  const [data, setData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [localState, setLocalState] = useState([]);
  const [clearData, setClearData] = useState(false);
  const [count, setCount] = useState(5);
  // const [address, setAddress] = useState([]);

  const [countOfCheckedElement, setCountOfCheckedElement] = useState(0);
  const [visibleLoader, setVisibleLoader] = useState(false);

  const notify = () =>
    toast.info(
      "Дякую, замовлення прийнято! Ваш менеджер вже сповіщений, будь ласка, очікуйте на зворотній зв'язок.!",
      {
        icon: () => <img src={check} alt="inform" />,
      }
    );

  const classes = cn("box__send-order", {
    "box__send-order-disabled":
      !Boolean(countOfCheckedElement) || localState.some((el) => el.error),
  });

  const classesForDownloadMore = cn("download-more", {
    "download-more-display-none": dataLength <= count,
  });

  const classShowHideLoader = cn("box__loader", {
    "box__loader-hide": visibleLoader,
  });

  useEffect(() => {
    // newDate().then((resp) => console.log(resp));
    // setVisibleLoader(false);
    // fetch().then((resp) => {
    //   console.log("My API", resp);
    //   setVisibleLoader(true);
    //   setData(resp.data);
    //   setDataLength(resp.data.length);
    // });
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

  useEffect(() => {
    newDate.then((resp) => {
      setVisibleLoader(true);
      setData(resp.data);
      setDataLength(resp.data.length);
    });
  }, []);

  const handleInput = (value, id) => {
    console.log("value", value);
    console.log("id", id);
    setLocalState(
      localState.map((elem) => {
        if (elem.id === id) {
          elem.count = value;
          if (!+elem.count) {
            elem.error = true;
          } else {
            elem.error = false;
          }
        }
        return elem;
      })
    );
  };

  const handleSelect = (value, id) => {
    localState.map((elem) =>
      elem.id === id ? (elem.address = value.label) : elem
    );
    console.log(localState);
    console.log(value);
    console.log(id);
  };

  const handleSetData = () => {
    setLocalState([]);
    setClearData((state) => !state);
  };

  const handleDesireDate = (date, elem) => {
    // localState.map(elem=> elem)
    console.log("APID", elem);
    console.log("APPDATE", date);
  };

  return (
    <div className="box">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        // pauseOnHover
        toastClassName="customToast"
      />
      <div className="box__title">
        Нове замовлення з історії
        <div className={classShowHideLoader}>
          <Loader />
          <div className="box__loader-title">Зачекайте, будь ласка</div>
        </div>
      </div>
      <div className={classes}>
        <button
          onClick={() => {
            notify();
            handleSetData();
            // fetch(count).then(({ data }) => setData(data));
          }}
          disabled={
            !Boolean(countOfCheckedElement) || localState.some((el) => el.error)
          }
          // disabled={false}
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
          {/* {data.slice(0, count).map((elem) => {
            return (
              <Item
                elem={elem}
                handleCheckbox={handleChangeCheckbox}
                handleInput={handleInput}
                handleSelect={handleSelect}
                clearData={clearData}
                key={elem.id}
                options={options}
                handleDesireDate={handleDesireDate}
              />
            );
          })} */}
        </tbody>
      </table>
      <div className={classesForDownloadMore}>
        <button
          onClick={() => setCount(count + 1)}
          disabled={dataLength <= count}
        >
          <div>
            <img src={loader} alt="loader" />
          </div>
          Показати ще
        </button>
      </div>
    </div>
  );
};
