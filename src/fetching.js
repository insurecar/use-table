import axios from "axios";

export const fetch = () =>
  axios.get(`https://618cfaa2edab980017fd512c.mockapi.io/duna-order`);

export const fetchLength = () =>
  axios.get("https://618cfaa2edab980017fd512c.mockapi.io/duna-order");
