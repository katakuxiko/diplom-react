import { observer } from 'mobx-react-lite';
import {FC, useContext, useState} from 'react';
import {Context} from '../index'
const LoginForm: FC = () => {
	const [username, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

	const {store} = useContext(Context)
	return (
    <div>
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUserName(e.target.value)}
        value={username}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <button onClick={() => store.login(username, password)}>Логин</button>
      <button onClick={() => store.register(username, name, password)}>Регистрация</button>
       
    </div>
  );
};

export default observer(LoginForm);