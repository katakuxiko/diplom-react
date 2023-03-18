import { ErrorMessage, Form, Field, Formik } from "formik";
import { FC, useContext, useState } from "react";
import { Context } from "../..";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

interface ListFormProps {
	isEdit: boolean;
	title: string;
	title_img: string;
	description: string;
}

const ListForm: FC<ListFormProps> = (props: ListFormProps) => {
	const { store } = useContext(Context);
	let { bookId } = useParams();
	if (props.isEdit) {
		console.log(bookId);
	}
	const [isClicked, setIsClicked] = useState(false);
  const [updated, setUpdated] = useState(false);
	const [imgU, setImgU] = useState("");
	const history = useNavigate();
	return (
		<div className="container">
			<div className="form_layot">
				<Formik
					initialValues={{
						title: props.title,
						description: props.description,
						title_img: props.title_img,
					}}
					validationSchema={Yup.object({
						title: Yup.string()
							.required("required")
							.min(4, "Не менее 4 символов"),
						title_img: Yup.string().url("Должна быть ссылка"),
						description: Yup.string().min(
							15,
							"Описание не должно быть маленьким"
						),
					})}
					onSubmit={(values) => {
						setIsClicked(true);
						if (values.title_img === "") {
							values.title_img =
								"https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
						}
						if (props.isEdit && bookId !== undefined) {
							store
								.updateList(
									bookId,
									values.title,
									values.description,
									values.title_img
								)
								.finally(() => {
									setIsClicked(false);
                  setUpdated(true);
								});
						} else {
							console.log("not edit");
							store
								.postLists(
									values.title,
									values.description,
									values.title_img
								)
								.finally(() => {
									values.title = "";
									values.description = "";
									values.title_img = "";
									history("/");
									setIsClicked(false);
								});
						}
					}}
				>
					<Form className="list_form">
						{imgU !== "" ? (
							<img className="list_img" src={imgU} alt="" />
						) : (
							""
						)}
						{props.title_img !== "" ? (
							<img
								className="list_img"
								src={props.title_img}
								alt=""
							/>
						) : (
							""
						)}
						<Field
							className="list_field"
							name="title"
							placeholder="Название"
							type="text"
						></Field>

						<Field
							className="list_field"
							type="url"
							name="title_img"
							placeholder="url вашей картинки"
							onBlur={(e: any) => {
								setImgU(e.target.value);
							}}
						></Field>
						<Field
							as="textarea"
							className="list_field"
							name="description"
							placeholder="Описание"
							type="textarea"
						></Field>
						<button disabled={isClicked} className="list_btn">
							Отправить
						</button>
						<ErrorMessage
							className="Error"
							component={"div"}
							name="title"
						></ErrorMessage>
						<ErrorMessage
							className="Error"
							component={"div"}
							name="description"
						></ErrorMessage>
						<ErrorMessage
							className="Error"
							component={"div"}
							name="title_img"
						></ErrorMessage>
					</Form>
				</Formik>
        {updated?<p style={{display:'block'}}>Уcпешно Обновлено</p>:<></>}
        
			</div>
		</div>
	);
};

export default ListForm;
