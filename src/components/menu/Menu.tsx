import { observer } from 'mobx-react-lite';
import {useState, useEffect, useContext} from 'react'
import { Context } from '../..';
import LogOut from '../img/logout1.png'

import './menu.scss'

function Menu(){
	const [active, setActive] = useState(false);
	const [classMenu, setClassMenu] = useState('');
	const { store } = useContext(Context);

	useEffect(() => {
		active ? setClassMenu('menu menu_active') : setClassMenu('menu');
	},[active])

	return (
    <div className={classMenu}>
      <div
        className="menu_item menu_toggle"
        onClick={(e) => {
          setActive(!active);
        }}
      >
        <div className="menu_btn">
          <div className="devider"></div>
          <div className="devider"></div>
          <div className="devider"></div>
        </div>
        {active ? <MenuItem></MenuItem> : null}
        <img
          className="menu_logout"
          onClick={() => store.logout()}
          src={LogOut}
          alt=""
        />
      </div>
    </div>
  );
}

function MenuItem(){
  	const { store } = useContext(Context);

  	return (
    <>
      <div>{store.user.username}</div>
    </>
  );
}

export default observer(Menu);