import { observer } from 'mobx-react-lite';
import React,{useEffect, useState} from 'react';
import { Context } from '.';
import LoginForm from './components/LoginForm';
import { IUser } from './models/IUser';
import UserService from './services/UserService';

const App = () => {
  const [users, setUsers] = useState<IUser>();
  const { store } = React.useContext(Context);
  
  useEffect(() => {
    if(localStorage.getItem('token')){
      store.checkAuth();
    }
  },[])
    console.log(users);
  async function getUsers(){
    try {
      const response = await UserService.fetchUsers(); 
      console.log(response);
      setUsers(response.data);
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  }
  if(!store.isAuth){
    return <LoginForm/>
  }
  if(store.isLoading){
    return <div>Загрузка...</div>
  }
  return (
    <>
      <h1>
        {store.isAuth ? "Пользователь авторизован" : "Пожалуйста авторизуйтесь"}
      </h1>

      <button onClick={() => store.logout()}>Выход</button>
      <button onClick={getUsers}>Get list</button>
      {users?.data.map(user => <h1 key={user.id}>{user.title}</h1>)}
    </>
  );
};

export default observer(App);