import React, { Suspense, lazy } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
const Admin = lazy(() => import("./components/admin/Admin"));
const UserPage = lazy(() => import("./components/users/UserPage"));
const MovieInfo = lazy(() => import("./components/users/MovieInfo"));
const MenuLayout = lazy(() => import("./components/layout/MenuLayout"));
const App = () => {
  return (
    <HashRouter>
      <Suspense fallback={<StyledLosding>Loading...</StyledLosding>}>
        <Routes>
          <Route path="/" element={<MenuLayout />}>
            <Route path="user" element={<UserPage />} />
            <Route path="/" element={<Admin />} />
          </Route>

          <Route path="user/:id" element={<MovieInfo />} />
        </Routes>
      </Suspense>

    </HashRouter>
  );
};

export default App;

const StyledLosding = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size:3rem;
  color:green;
`;
