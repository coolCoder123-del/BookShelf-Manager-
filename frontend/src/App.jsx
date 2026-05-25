import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import UpdateBook from "./pages/UpdateBook";
import Login from "./pages/Login";

import backgroundImage from "./assets/library-bg.jpg"; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // CHECK LOGIN STATUS ON LOAD
  useEffect(() => {
    const loginStatus =
      localStorage.getItem("isLoggedIn") === "true";

    setIsLoggedIn(loginStatus);
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* DARK OVERLAY FOR READABILITY */}
      <div className="min-h-screen bg-black/60">

        <Routes>

          {/* LOGIN */}
          <Route
            path="/login"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Login />
            }
          />

          {/* HOME */}
          <Route
            path="/"
            element={
              isLoggedIn ? <Home /> : <Navigate to="/login" />
            }
          />

          {/* CREATE */}
          <Route
            path="/create-book"
            element={
              isLoggedIn ? (
                <CreateBook />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* DELETE */}
          <Route
            path="/delete-book/:id"
            element={
              isLoggedIn ? (
                <DeleteBook />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* UPDATE */}
          <Route
            path="/update-book/:id"
            element={
              isLoggedIn ? (
                <UpdateBook />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* SHOW */}
          <Route
            path="/show-book/:id"
            element={
              isLoggedIn ? (
                <ShowBook />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

        </Routes>
      </div>
    </div>
  );
};

export default App;