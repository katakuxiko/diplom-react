import { observer } from 'mobx-react-lite';
import {useState, useEffect, useContext} from 'react'
import { Context } from '../..';
import {Link} from 'react-router-dom';

import LogOut from '../img/logout1.png';
import Profile from '../img/profile.png';
import Home from '../img/home.png';
import Plus from '../img/plus.png';
import Books from '../img/books.png'

import './menu.scss';

function Menu(){
	const [active, setActive] = useState(false);
	const [classMenu, setClassMenu] = useState('');
	const { store } = useContext(Context);

	useEffect(() => {
		active ? setClassMenu('menu menu_active') : setClassMenu('menu');
	},[active])

	return (
    <div className={classMenu}>
      <div className="menu_item menu_toggle">
        <div
          className="menu_btn"
          onClick={() => {
            setActive(!active);
          }}
        >
          <div className="devider"></div>
          <div className="devider"></div>
          <div className="devider"></div>
        </div>

        {active ? (
          <MenuItem></MenuItem>
        ) : (
          <div className="links_icons">
            <Link to={"/My/Profile"}>
              <img src={Profile} alt="" />
            </Link>
            <Link to={"/"}>
              <img src={Home} alt="" />
            </Link>
            <Link to={"/books"}>
              <img src={Plus} alt="" />
            </Link>
            <Link to={"/My/Books"}>
              <img src={Books} alt="" />
            </Link>
          </div>
        )}
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
        <Link className='link' to={'/My/Profile'}>{store.user.username}</Link>
        <Link className='link' to={'/'}>Главная</Link>
        <Link className='link' to={"/books"}>Добавить книгу</Link>
        <Link className='link' to={"/My/Books"}>Мои книги</Link>
      </>
    );
}

export default observer(Menu);