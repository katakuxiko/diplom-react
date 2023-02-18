import { FC } from 'react';
import ListForm from '../ListForm/ListForm';
import './ModalEdit.scss'
interface ModalEditProps {
	id : number;
	title: string;
	description: string;
	title_img: string;
}
 
const ModalEdit: FC<ModalEditProps> = (props: ModalEditProps) => {
	return(
		<div className="layout">
			<ListForm title={props.title} title_img={props.title_img} description={props.description} isEdit={true}/>
		</div>
	)
}
 
export default ModalEdit;