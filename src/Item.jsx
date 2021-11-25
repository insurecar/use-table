import React, { useState, useEffect } from "react";
import cn from "classnames";
import moment from "moment";
import Select from "react-select";

export const Item = ({
  elem,
  handleCheckbox,
  handleInput,
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

  useEffect(() => {
    setInputSelectOfAddress(options);
    console.log("USE EFFECT");
  }, [options.length]);

  const handleInputOfCount = ({ target: { value } }, id) => {
    setInputValueOfCount(value);
    handleInput(value, id);
  };

  const handleChangeOfSelectAddress = (value, id) => {
    // console.log(
    //   "%c VALUE Select",
    //   "background: coral; padding: 20px; border: 3px solid red",
    //   value
    // );
    // console.log("%c ID", "background: green; padding: 20px", id);
  };

  useEffect(() => {
    setChecked(false);
    setInputValueOfCount("");
  }, [clearData]);

  useEffect(() => {
    setInputValueOfCount(elem.count);
    setInputSelectOfAddress(options);
  }, [elem]);

  return (
    <tr key={elem.id} className="item-tr">
      <td>
        <label className={classes}>
          <input type="checkbox" onChange={checkBoxHandler} checked={checked} />
        </label>
      </td>
      <td>{moment(elem.desiredDate * 1000).format("DD-MM-yyyy")}</td>
      <td>{elem.name}</td>
      <td className="item-tr__count">
        {checked ? (
          <>
            <input
              maxLength="6"
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
        <Select
          options={options}
          value={inputSelectOfAddress[0]}
          onChange={(e) => handleChangeOfSelectAddress(e, elem.id)}
          className="selected"
        />
      </td>
      <td>{moment(elem.desiredDate * 1000).format("DD-MM-yyyy")}</td>
    </tr>
  );
};
