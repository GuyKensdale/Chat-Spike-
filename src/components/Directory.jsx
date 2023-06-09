import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Directory = () => {
  const [user] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const haveSetUsers = useRef(false);

  useEffect(() => {
    const q = query(collection(db, "User-Collection"), orderBy("name"));
    const usersQuery = onSnapshot(q, (querySnapshot) => {
      let usersList = [];
      querySnapshot.forEach((doc) => {
        usersList.push({ ...doc.data(), id: doc.id });
      });
      setUsers(usersList);
      haveSetUsers.current = true;
    });
    return () => usersQuery();
  }, []);

  useEffect(() => {
    if (user) {
      const userCheck = (givenUser) => {
        for (const user of users) {
          if (givenUser.uid === user.uid) {
            return true;
          }
        }
        return false;
      };

      if (userCheck(auth.currentUser)) {
        return;
      } else {
        if (haveSetUsers.current === true) {
          addDoc(collection(db, "User-Collection"), {
            name: auth.currentUser.displayName,
            uid: auth.currentUser.uid,
          });
        }
      }
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
