import React, { useState, useEffect } from "react";
import cs from "classnames";

export const Item = ({ elem, handleCheckbox, handleInput, clearData }) => {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState(elem.country);
  console.log("ELEMENT", elem.country);

  const classes = cs("item", { "item-checked ": checked });

  const checkBoxHandler = () => {
    handleCheckbox(elem);
    setChecked((state) => !state);
  };

  const handleInput11 = ({ target: { value } }, id) => {
    setInputValue(value);
    handleInput(value, id);
  };

  useEffect(() => {
    setChecked(false);
    setInputValue("");
  }, [clearData]);

  return (
    <tr key={elem.id}>
      <td>
        <label className={classes}>
          <input type="checkbox" onChange={checkBoxHandler} checked={checked} />
        </label>
      </td>
      <td>{elem.country}</td>
      <td>{elem.last_name}</td>
      <td>{elem.email}</td>
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
