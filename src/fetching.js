import axios from "axios";

// export const fetch = () =>
//   axios.get(`https://618cfaa2edab980017fd512c.mockapi.io/duna-order`);

// export const fetch = axios.get(
//   "https://www.dunapack-tavria.com/ajax/profile/historyOrders",
//   {
//     headers: {
//       authorization: '"39de5a2f84f41ee99ccf5bc05f0b4e96"',
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//   }
// );

// export const someData = axios.post(
//   "https://www.dunapack-tavria.com/ajax/profile/historyOrders",
//   { token: "39de5a2f84f41ee99ccf5bc05f0b4e96" }
// );

export const fetch = axios.get(
  "https://www.dunapack-tavria.com/ajax/profile/historyOrders",
  {
    headers: {
      authorization: '"39de5a2f84f41ee99ccf5bc05f0b4e96"',
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }
);
