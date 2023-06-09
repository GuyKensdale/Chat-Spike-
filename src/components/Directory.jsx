import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { db } from "../firebase";

const Directory = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [validUSer, setValidUser] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "User-Collection"), orderBy("name"));
    const usersQuery = onSnapshot(q, (querySnapshot) => {
      let usersList = [];
      querySnapshot.forEach((doc) => {
        usersList.push({ ...doc.data(), id: doc.id });
      });
      console.log(usersList);
      setUsers(usersList);
    });
    return () => usersQuery();
  }, []);

  useEffect(() => {
    if (user) {
      const userCheck = (givenUser) => {
        console.log(users);
        console.log(givenUser);

        for (user of users) {
          if (givenUser.uid === user.uid) {
            setValidUser(true);
          }
        }
        setValidUser(false).then((validUSer) => {
          if (validUSer) {
            return;
          } else {
            addDoc(collection(db, "User-Collection"), {
              name: user.displayName,
              uid: user.uid,
            });
          }
        });
      };
    }
  }, [users]);

  return (
    <nav>
      <NavLink to="/chat-1">Go To Chat 1</NavLink>
      <NavLink to="/chat-2">Go To Chat 2</NavLink>
    </nav>
  );
};

export default Directory;
