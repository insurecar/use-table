import React, { useState, useEffect } from "react";
import cn from "classnames";
import moment from "moment";
import Select from "react-select";
import calendar from "../src/styles/icons/calendar.png";
import DatePicker from "react-datepicker";

export const Item = ({
  elem,
  handleCheckbox,
  handleInput,
  handleSelect,
  clearData,
  options,
  handleDesireDate,
}) => {
  const [checked, setChecked] = useState(false);
  const [inputValueOfCount, setInputValueOfCount] = useState("");
  const [inputSelectOfAddress, setInputSelectOfAddress] = useState("");
  const [desireDate, setDesireDate] = useState(
    new Date().setDate(new Date().getDate() + 3)
  );

  const minDate = new Date();

  const classes = cn("item", { "item-checked ": checked });

  const checkBoxHandler = () => {
    handleCheckbox(elem);
    setChecked((state) => !state);
  };

  // useEffect(() => {
  //   setInputSelectOfAddress(options);
  // }, [options.length]);

  // console.log("options", options);

  const handleInputOfCount = ({ target: { value } }, id) => {
    if (value.length < 7) {
      setInputValueOfCount(value);
      handleInput(value, id);
    }
  };

  const handleChangeOfSelectAddress = (value, id) => {
    setInputSelectOfAddress(value);
    handleSelect(value, id);
    console.log(
      "%c VALUE Select",
      "background: coral; padding: 20px; border: 3px solid red",
      value
    );

    console.log("%c ID", "background: green; padding: 20px", id);
  };

  useEffect(() => {
    setChecked(false);
    setInputValueOfCount("");
  }, [clearData]);

  useEffect(() => {
    setInputValueOfCount(elem.count);
    setInputSelectOfAddress(options[0]);
  }, [elem]);

  const handleLocalDesiredDate = (date, id) => {
    // console.log("DATE LOCAL", date);
    setDesireDate(date);
    handleDesireDate(date, id);
  };

  return (
    <tr key={elem.id} className="item-tr">
      <td>
        <label className={classes}>
          <input type="checkbox" onChange={checkBoxHandler} checked={checked} />
        </label>
      </td>
      <td>{elem.dateOrdered}</td>
      <td>{elem.name}</td>
      <td className="item-tr__count">
        {checked ? (
          <>
            <input
              className={cn("item-tr__count-inputCountOfOrder", {
                "item-tr__count-inputCountOfOrder-error": elem.error,
              })}
              onChange={(e) => handleInputOfCount(e, elem.id)}
              value={inputValueOfCount}
              type="number"
            />
            {elem.error ? (
              <span className=" item-tr__count-showError">
                Поле не може бути порожнім
              </span>
            ) : null}
          </>
        ) : (
          <div className="item-tr__count-divCountOfOrder ">
            {elem.count.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1 ")}
          </div>
        )}
      </td>
      <td className="item-tr__brand">{elem.brand}</td>
      <td>{elem.countOfColors}</td>
      <td>
        {checked ? (
          <Select
            options={options}
            value={inputSelectOfAddress}
            onChange={(e) => handleChangeOfSelectAddress(e, elem.id)}
            className="selected"
            disable
          />
        ) : (
          <div>{inputSelectOfAddress.label}</div>
        )}

        {/* <div>{inputSelectOfAddress.label}</div> */}
      </td>
      <td>
        <div className="wrapper">
          <div className="wrapper__icon">
            <div className="wrapper__icon-center">
              <img src={calendar} alt="" />
            </div>
          </div>

          <div className="wrapper__calendar">
            <DatePicker
              minDate={minDate.setDate(minDate.getDate() + 3)}
              // locale={fi}
              selected={desireDate}
              onChange={(date) => handleLocalDesiredDate(date, elem.id)}
              disabled={!checked}
              dateFormat="dd-MM-yyyy"
            />
          </div>
          {/* <div>
            <div>
              <img src={calendar} alt="" />
            </div>
          </div>
          <div>{moment(elem.desiredDate * 1000).format("DD-MM-yyyy")}</div> */}
        </div>
      </td>
    </tr>
  );
};
