import React, { useState, useEffect } from "react";
import cn from "classnames";
import moment from "moment";
import Select from "react-select";

export const Item = ({ elem, handleCheckbox, handleInput, clearData }) => {
  const [checked, setChecked] = useState(false);
  const [inputValueOfCount, setInputValueOfCount] = useState("");

  const classes = cn("item", { "item-checked ": checked });
  const [inputSelectOfAddress, setinputSelectOfAddress] = useState("");

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

  const handleInputOfCount = ({ target: { value } }, id) => {
    // console.log("value", value);
    setInputValueOfCount(value);
    handleInput(value, id);
  };

  const handleChangeOfSelectAddress = (value, id) => {
    console.log("%c VALUE Select", "background: coral; padding: 20px", value);
    console.log("%c ID", "background: green; padding: 20px", id);
  };

  console.log(inputSelectOfAddress);

  useEffect(() => {
    setChecked(false);
    setInputValueOfCount("");
  }, [clearData]);

  useEffect(() => {
    setInputValueOfCount(elem.count);
    setinputSelectOfAddress(options);
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
              maxLength="6"
              className={cn("item-tr__count-inputCountOfOrder", {
                "item-tr__count-inputCountOfOrder-error": elem.error,
              })}
              onChange={(e) => handleInputOfCount(e, elem.id)}
              value={inputValueOfCount}
              type="text"
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
      <td>{moment(elem.desiredDate).format("DD-MM-yyyy")}</td>
    </tr>
  );
};
