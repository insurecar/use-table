import axios from "axios";

export const fetch = (count) =>
  axios.get(
    `https://618cfaa2edab980017fd512c.mockapi.io/duna-order?page=1&limit=${count}`
  );

export const fetchLength = () =>
  axios.get("https://618cfaa2edab980017fd512c.mockapi.io/duna-order");
