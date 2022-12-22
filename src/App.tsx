import { observer } from "mobx-react-lite";
// import React, { useEffect, useState } from "react";
// import { Context } from ".";
// import { IList } from "./models/IList";
// import ListService from "./services/ListService";
// import LoginForm from "./components/LoginForm/LoginForm";

// const App = () => {
//   const [lists, setlists] = useState<IList>();
//   const { store } = React.useContext(Context);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       store.checkAuth();
//     }
//   }, []);
//   console.log(lists);
//   async function getlists() {
//     try {
//       const response = await ListService.fetchLists();
//       setlists(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   if (!store.isAuth) {
//     return <LoginForm />;
//   }
//   if (store.isLoading) {
//     return <div>Загрузка...</div>;
//   }
//   return (
//     <>
//       {/* <h1>
//         {store.isAuth ? "Пользователь авторизован" : "Пожалуйста авторизуйтесь"}
//       </h1> */}

//       <button onClick={() => store.logout()}>Выход</button>
//       <button onClick={getlists}>Get list</button>
//       {lists?.data.map((user) => (
//         <h1 key={user.id}>{user.title}</h1>
//       ))}
//     </>
//   );
// };

// export default observer(App);
