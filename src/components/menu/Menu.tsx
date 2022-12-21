import {useState, useEffect} from 'react'

import './menu.scss'

function Menu(){
	const [active, setActive] = useState(false);
	const [classMenu, setClassMenu] = useState('');
	useEffect(() => {
		active ? setClassMenu('menu menu_active') : setClassMenu('menu');
	},[active])

	return(
		<div className = {classMenu}>
			<div className="menu_item menu_toggle" onClick={(e)=>{
				setActive(!active);
				}}>
					<div className="menu_btn">
						<div className="devider"></div>
						<div className="devider"></div>
						<div className="devider"></div>
					</div>
					
				</div>
			{/* {active?<MenuItem active={active} setActive={setActive}></MenuItem>:null} */}

		</div>
		
	)
}

function MenuItem(){
	return(
		<>
			
		</>
	)
}

export default Menu;