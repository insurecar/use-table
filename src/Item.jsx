import React, { useState, useEffect } from "react";
import cn from "classnames";
import moment from "moment";
import Select from "react-select";
import calendar from "../src/styles/icons/calendar.png";

export const Item = ({
  elem,
  handleCheckbox,
  handleInput,
  handleSelect,
  clearData,
  options,
}) => {
  const [checked, setChecked] = useState(false);
  const [inputValueOfCount, setInputValueOfCount] = useState("");
  const [inputSelectOfAddress, setInputSelectOfAddress] = useState("");

  const classes = cn("item", { "item-checked ": checked });

  const checkBoxHandler = () => {
    handleCheckbox(elem);
    setChecked((state) => !state);
  };

  // useEffect(() => {
  //   setInputSelectOfAddress(options);
  // }, [options.length]);

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

  return (
    <tr key={elem.id} className="item-tr">
      <td>
        <label className={classes}>
          <input type="checkbox" onChange={checkBoxHandler} checked={checked} />
        </label>
      </td>
      <td>{moment(elem.dateOrdered * 1000).format("DD-MM-yyyy")}</td>
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
      </td>
      {/* <td className="wish-date"> */}
      <td>
        <div className="wrapper">
          <div>
            <div>
              <img src={calendar} alt="" />
            </div>
          </div>
          <div>{moment(elem.desiredDate * 1000).format("DD-MM-yyyy")}</div>
        </div>
      </td>
    </tr>
  );
};
