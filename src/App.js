import React from "react";
import Navbar from "./components/Navbar";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Chat from "./components/Chat";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Directory from "./components/Directory";
import Chat2 from "./components/Chat2";

const style = {
  appContainer: `max-w-[728px] mx-auto text-center`,
  sectionContainer: `flex flex-col h-[90vh] bg-gray-100 mt-10 shadow-xl border relative`,
};

function App() {
  const [user] = useAuthState(auth);
  return (
    <BrowserRouter>
      <div className={style.appContainer}>
        <section className={style.sectionContainer}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Directory />} />
            <Route path="/chat-1" element={user ? <Chat /> : null} />
            <Route path="/chat-2" element={user ? <Chat2 /> : null} />
          </Routes>
        </section>
      </div>
    </BrowserRouter>
  );
}

export default App;
