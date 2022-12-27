import { FC, useContext, useEffect } from "react";
import "../scss/style.scss";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chart from "../chart/Chart";
import NewBooks from "../newBooks/NewBooks";
import Menu from "../menu/Menu";
import LoginForm from "../LoginForm/LoginForm";
import ListForm from "../ListForm/ListForm";
import MyBooks from '../myBooks/MyBooks';
interface appProps {
  className: string;
}

const App: FC = (appProps) => {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.setAuth(true);
      store.checkAuth();
      store.refresh().catch(() => {
        localStorage.removeItem("token");
        store.setAuth(false);
      });
    }
  }, []);
  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }
  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="main">
              <Menu></Menu>
              <div className="container">
                <Chart></Chart>
                <NewBooks></NewBooks>
              </div>
            </div>
          }
        ></Route>
        <Route
          path="/books"
          element={
            <>
              {" "}
              <Menu></Menu>
              <ListForm></ListForm>
            </>
          }
        ></Route>
        <Route
          path="/My/books"
          element={
            <>
              {" "}
              <Menu></Menu>
              <MyBooks></MyBooks>
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default observer(App);
