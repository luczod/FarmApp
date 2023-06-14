import React, { useEffect, useState } from "react";
import bus from "../../utils/bus";

import styles from "./Message.module.css";
let Elemento: Element | null = document.querySelector(".close");

const MessageBox: React.FC = () => {
  let [visibility, setVisibility] = useState<Boolean>(false);
  let [message, setMessage] = useState<string>("");
  let [type, setType] = useState<string>("");

  useEffect(() => {
    bus.addListener("flash", ({ message, type }) => {
      setVisibility(true);
      setMessage(message);
      setType(type);
      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  useEffect(() => {
    if (Elemento !== null) {
      Elemento.addEventListener("click", () => setVisibility(false));
    }
  });

  return (
    <>
      {visibility && (
        <div className={`${styles.message} ${styles[type]}`}>{message}</div>
      )}
    </>
  );
};

export default MessageBox;
