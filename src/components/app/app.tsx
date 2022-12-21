import { FC, useContext, useEffect } from "react";
import "../scss/style.scss";
import { Context } from "../..";
import { observer } from 'mobx-react-lite';

import Chart from '../chart/Chart';
import NewBooks from '../newBooks/NewBooks';
import Menu from '../menu/Menu';
import LoginForm from "../LoginForm/LoginForm";

interface appProps {
  className: string;
}

const App: FC = (appProps) => {
  const { store } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem("token")) {
		store.setAuth(true)
      	store.checkAuth();
    }
  }, []);
  if (store.isLoading) {
    return <div>Загрузка...</div>;
  }
  if (!store.isAuth) {
    return <LoginForm />;
  }

  

  return (
    <div className="main">
		<Menu></Menu>
      <div className="container">
        <Chart></Chart>
        <NewBooks></NewBooks>
      </div>
    </div>
  );

};

export default observer(App);
