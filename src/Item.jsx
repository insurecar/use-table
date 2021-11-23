import React, { useState, useEffect } from "react";
import cs from "classnames";
import moment from "moment";
import Select from "react-select";

export const Item = ({ elem, handleCheckbox, handleInput, clearData }) => {
  const [checked, setChecked] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const classes = cs("item", { "item-checked ": checked });

  const options = [
    {
      value: "chocolate",
      label: "м. Львів вул. Залізнична, буд. 65",
    },
    { value: "strawberry", label: "м. Львів вул. УПА, буд. 65" },
    { value: "vanilla", label: "м. Львів вул. Квітки, буд. 65" },
    { value: "vanjj", label: "м. Львів вул. Замарстинівська, буд. 65" },
    { value: "chocolaввte", label: "м. Львів вул. Залізнична, буд. 65" },
    { value: "strawввberry", label: "м. Львів вул. УПА, буд. 65" },
    { value: "vaniвваіваlla", label: "м. Львів вул. Квітки, буд. 65" },
    { value: "vanіваіваjj", label: "м. Львів вул. Замарстинівська, буд. 65" },
    { value: "strawberry", label: "м. Львів вул. УПА, буд. 65" },
    { value: "vanilla", label: "м. Львів вул. Квітки, буд. 65" },
    { value: "vanjj", label: "м. Львів вул. Замарстинівська, буд. 65" },
    { value: "chocolaввte", label: "м. Львів вул. Залізнична, буд. 65" },
    { value: "strawввberry", label: "м. Львів вул. УПА, буд. 65" },
    { value: "vaniвваіваlla", label: "м. Львів вул. Квітки, буд. 65" },
    { value: "vanіваіваjj", label: "м. Львів вул. Замарстинівська, буд. 65" },
  ];

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
        {checked ? (
          <>
            <input
              className="item-tr__count-inputCountOfOrder"
              onChange={(e) => handleInput11(e, elem.id)}
              value={inputValue}
              type="number"
            />
            {elem.error ? <span>Error</span> : null}
          </>
        ) : (
          <div className="item-tr__count-divCountOfOrder"> {elem.count}</div>
        )}
      </td>
      <td className="item-tr__brand">{elem.brand}</td>
      <td>{elem.countOfColors}</td>
      <td>
        <Select
          options={options}
          defaultValue={options[0]}
          className="selected"
        />
      </td>
      <td>{moment(elem.desiredDate).format("DD-MM-yyyy")}</td>
    </tr>
  );
};
