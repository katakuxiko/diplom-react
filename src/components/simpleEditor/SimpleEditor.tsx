import { FC, useState } from "react";
import "./simpleEditor.scss";
import MDEditor from "@uiw/react-md-editor";
import { useParams } from "react-router-dom";
import ItemService from "../../services/ItemService";
import * as Yup from 'yup'

import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";

interface SimpleEditorProps {}

const SimpleEditor: FC<SimpleEditorProps> = () => {
	const [value, setValue] = useState<string>("Initial value");
	const [response, setResponse] = useState<number>();
	const [btnActive, setBtnActive] = useState<boolean>(true);

	let { bookId } = useParams();
	if (!bookId) {
		return <>Такой страницы нет</>;
	}
	const initialValue = {
		title: "",
		condition: "",
		buttons: [
			{
				btnAction: '',
				btnName: "",
				btnVar: "",
			},
		],
	};
	return (
		<div className="mde__wrapper">
			<Formik
				validationSchema={Yup.object().shape({
					title: Yup.string()
						.min(2, "Слишком короткое название")
						.max(50, "Слишком длинное название")
						.required("Обязательное поле"),
					condition: Yup.string().matches(
						/^((?:\w+ [<|>|=] \d+; )+?)?(\w+ [<|>|=] \d+)$/gm,
						"Предложение должно соотвествовать Health > 10; Health < 15 В конце без пробела и других знаков"
					),
					buttons: Yup.array().of(
						Yup.object().shape({
							btnName: Yup.string().required("Обязательное поле"),
							btnAction: Yup.string().matches(
								/^((?:[-]?\d+, )?)+([-]?\d+)$/gm,
								"цифры должны быть 20, 30, -40, 20, -30  В конце без пробела и запятой"
							),
							btnVar: Yup.string().matches(
								/^((\w+, )+)?(\w+)$/gm,
								"переменные должны быть health, status, message в конце без пробела и других знаков"
							),
						})
					),
				})}
				initialValues={initialValue}
				onSubmit={(e, actions) => {
					setBtnActive(false);
					console.log(e);
					ItemService.postItem(
						bookId ? bookId : "0",
						e.title,
						value,
						e.buttons,
						e.condition
					).then((is) => {
						actions.setSubmitting(false);
						setValue("Initial value");
						actions.resetForm({
							values: {
								title: "",
								condition: "",
								buttons: [
									{
										btnAction: "",
										btnName: "",
										btnVar: "",
									},
								],
							},
						});
						setTimeout(() => setBtnActive(true), 1000);
						setResponse(is.data.id);
					});
				}}
			>
				{({ values }) => (
					<Form>
						<div className="input_div">
							<Field
								placeholder="Название главы"
								name="title"
								type="text"
							/>
							<ErrorMessage name="title" component={"label"} />
						</div>
						<div className="input_div">
							<Field
								placeholder="Условие: health > 10; mana = 85"
								name="condition"
								type="text"
							/>
							<ErrorMessage
								name="condition"
								component={"label"}
							/>
						</div>

						<MDEditor
							value={value}
							onChange={(val) => {
								val && setValue(val);
							}}
						/>
						<FieldArray name="buttons">
							{({ insert, remove, push }) => (
								<div className="buttons">
									{values.buttons.length > 0 &&
										values.buttons.map((Button, index) => (
											<div className="row" key={index}>
												<div className="col">
													<label
														htmlFor={`buttons.${index}.btnName`}
													>
														Название
													</label>
													<Field
														name={`buttons.${index}.btnName`}
														placeholder="Название кнопки"
														type="text"
													/>
													<ErrorMessage
														name={`buttons.${index}.btnName`}
														component="div"
														className="field-error"
													/>
												</div>
												<div className="col">
													<label
														htmlFor={`buttons.${index}.btnAction`}
													>
														Число на которое
														изменится переменная
													</label>
													<Field
														name={`buttons.${index}.btnAction`}
														placeholder="числа"
														type="text"
													/>
													<ErrorMessage
														name={`buttons.${index}.btnAction`}
														component="div"
														className="field-error"
													/>
												</div>
												<div className="col">
													<label
														htmlFor={`buttons.${index}.btnVar`}
													>
														Переменная
													</label>
													<Field
														name={`buttons.${index}.btnVar`}
														placeholder="Health"
														type="text"
													/>
													<ErrorMessage
														name={`buttons.${index}.btnVar`}
														component="div"
														className="field-error"
													/>
												</div>
												<div className="col">
													{index === 0 ? (
														""
													) : (
														<>
															<button
																type="button"
																className="deleteBtn"
																onClick={() => {
																	if (
																		index !==
																		0
																	) {
																		remove(
																			index
																		);
																	}
																}}
															>
																X
															</button>
														</>
													)}
												</div>
											</div>
										))}
									<button
										type="button"
										className="secondary"
										onClick={() =>
											push({
												btnName: "",
												btnVar: "",
												btnAction: "",
											})
										}
									>
										Добавить кнопку
									</button>
								</div>
							)}
						</FieldArray>
						<button
							className="submitBtn"
							type="submit"
							disabled={!btnActive}
						>
							Отправить форму
						</button>
					</Form>
				)}
			</Formik>

			{response && (
				<h2 style={{ color: "white" }}>
					Страница с айди {response} успешно отправлена
				</h2>
			)}
		</div>
	);
};

export default SimpleEditor;
