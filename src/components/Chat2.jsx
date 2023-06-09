import React, { useState, useEffect, useRef } from "react";
import Message from "./Message";
import { db } from "../firebase";
import { query, collection, orderBy, onSnapshot } from "firebase/firestore";
import SendMessage from "./SendMessage";

const style = {
  main: `flex flex-col p-[10px] relative overflow-y-scroll max-h-[85%]`,
};

const Chat2 = () => {
  const chatDB = "messages2";
  const [messages, setMessages] = useState([]);
  const scroll = useRef();

  useEffect(() => {
    const q = query(collection(db, `${chatDB}`), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <main className={style.main}>
        {messages &&
          messages.map((message) => {
            return <Message key={message.id} message={message} />;
          })}
        <span ref={scroll}></span>
      </main>
      <SendMessage chatDB={chatDB} scroll={scroll} />
    </>
  );
};

export default Chat2;
