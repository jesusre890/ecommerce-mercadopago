import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from 'axios'
import React from "react";
import style from "./Criptos.module.css";
import img from "../img/bitcoin.gif";

const Criptos = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago("TEST-3c2738e3-c400-4486-a048-720196fb68bf");

  const createPreference = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/create_preference",
        {
          description: "Bitcoin",
          price: 32552,
          quantity: 1,
          //currency_id: 'USD'
        }
      );

      const { id } = response.data;
      return id;
    } catch(error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.cards}>
        <div className={style.bitcoin}>
          <img src={img} alt="Bitcoin" />
          <h3>Bitcoin</h3>
          <p className={style.precio}>usd 32552</p>
          <button onClick={handleBuy}>Buy</button>
          {preferenceId && (
            <Wallet initialization={{ preferenceId }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Criptos;
