import React, { useState, useEffect } from "react";
import cs from "classnames";
import moment from "moment";

export const Item = ({ elem, handleCheckbox, handleInput, clearData }) => {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState(elem.phone);

  const classes = cs("item", { "item-checked ": checked });

  const checkBoxHandler = () => {
    handleCheckbox(elem);
    setChecked((state) => !state);
  };

  const handleInput11 = ({ target: { value } }, id) => {
    // console.log("value", value);
    setInputValue(value);
    handleInput(value, id);
  };

  useEffect(() => {
    setChecked(false);
    setInputValue("");
  }, [clearData]);

  useEffect(() => {
    setInputValue(elem.phone);
  }, [elem]);

  return (
    <tr key={elem.id} className="item-tr">
      <td>
        <label className={classes}>
          <input type="checkbox" onChange={checkBoxHandler} checked={checked} />
        </label>
      </td>
      <td>{moment(elem.country * 1000).format("DD-YY-yyyy")}</td>
      <td>{elem.last_name}</td>
      <td>{elem.country}</td>
      <td>{elem.date_of_birth}</td>
      <td>{elem.age}</td>
      <td>
        {checked ? (
          <input
            onChange={(e) => handleInput11(e, elem.id)}
            value={inputValue}
          />
        ) : (
          elem.phone
        )}
      </td>
      <td>{elem.phone}</td>
    </tr>
  );
};
