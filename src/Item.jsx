import React, { useState, useEffect } from "react";
import cs from "classnames";
import moment from "moment";

export const Item = ({ elem, handleCheckbox, handleInput, clearData }) => {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");

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
    setInputValue(elem.count);
  }, [elem]);

  return (
    <tr key={elem.id} className="item-tr">
      <td>
        <label className={classes}>
          <input type="checkbox" onChange={checkBoxHandler} checked={checked} />
        </label>
      </td>
      <td>{moment(elem.dateOrdered * 1000).format("DD-YY-yyyy")}</td>
      <td>{elem.name}</td>
      <td className="item-tr__count">
        <div> {elem.count} </div>
      </td>
      <td className="item-tr__brand">{elem.brand}</td>
      <td>
        {" "}
        {checked ? (
          <input
            onChange={(e) => handleInput11(e, elem.id)}
            value={inputValue}
          />
        ) : (
          elem.countfColors
        )}
      </td>
      <td>
        <select name="" id="">
          <option value="">1</option>
          <option value="">2</option>
          <option value="">3</option>
          <option value="">4</option>
        </select>
      </td>
      <td>{elem.desiredDate}</td>
    </tr>
  );
};
