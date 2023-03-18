import { observer } from "mobx-react-lite";
import { FC, useContext, useState } from "react";
import { Context } from "../../index";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LRForm: FC = () => {
	const [reg, setReg] = useState<boolean>();
	return (
		<div className="form_layout">
			<div className="container">
				<div className="form_main">
					{reg ? <Reg></Reg> : <Login></Login>}
					<button
						className="form_toggle"
						onClick={() => setReg(!reg)}
					>
						Зарегистрироваться/Войти
					</button>
				</div>
			</div>
		</div>
	);
};
interface LoginProps {}

const Login: FC<LoginProps> = () => {
	const { store } = useContext(Context);
	const [loading, setLoading] = useState<Boolean>(false);
	const [statusCode, setStatusCode] = useState<number>();
	return (
		<Formik
			initialValues={{
				username: "",
				password: "",
			}}
			validationSchema={Yup.object({
				username: Yup.string()
					.min(2, "Минимальное количество букв 2")
					.max(20, "Максимальная длина 20")
					.required("Должно быть заполнено"),
				password: Yup.string()
					.min(6, "Сликшом короткий пароль")
					.required("Обязательное поле"),
			})}
			onSubmit={(values) => {
				setLoading(true);
				store
					.login(values.username, values.password)
					.then((res) => setStatusCode(res))
					.finally(() => {
						setTimeout(() => {
							console.log(statusCode);
							setLoading(false);
						}, 500);
					});
			}}
		>
			<Form className="form_formik" action="">
				<Field
					className="form_input"
					type="text"
					placeholder="username"
					name="username"
				/>
				<ErrorMessage
					component={"span"}
					className="form_error"
					name="username"
				></ErrorMessage>
				<Field
					className="form_input"
					type="password"
					placeholder="password"
					name="password"
				/>
				<ErrorMessage
					component={"span"}
					className="form_error"
					name="password"
				></ErrorMessage>

				<button className={loading ? "disabled" : ""}>Логин</button>
				{statusCode === 400 ? (
					<div className="form_error">Не удалось войти</div>
				) : (
					""
				)}
			</Form>
		</Formik>
	);
};

const Reg: FC = (RegProps) => {
	const { store } = useContext(Context);
	const [loading, setLoading] = useState<Boolean>(false);
	const [statusCode, setStatusCode] = useState<number>(0);
	return (
		<Formik
			initialValues={{
				username: "",
				email: "",
				password: "",
			}}
			validationSchema={Yup.object({
				username: Yup.string()
					.min(2, "Минимальное количество букв 2")
					.max(20, "Максимальная длина 20")
					.required("Обязательное поле"),
				email: Yup.string()
					.email("Введите корректный email адрес")
					.required("Обязательное поле"),
				password: Yup.string()
					.min(6, "Сликшом короткий пароль")
					.required("Обязательное поле"),
			})}
			onSubmit={(values) => {
				setLoading(true);
				store
					.register(values.username, values.email, values.password)
					.then((res) => {
						setStatusCode(res);
						console.log(res);
					})
					.finally(() => {
						setTimeout(() => {
							console.log(statusCode);
							setLoading(false);
						}, 500);
					});
			}}
		>
			<Form className="form_formik form_formik_reg " action="">
				<Field
					className="form_input"
					type="text"
					placeholder="username"
					name="username"
				/>
				<ErrorMessage
					component={"span"}
					className="form_error"
					name="username"
				></ErrorMessage>

				<Field
					className="form_input"
					type="email"
					placeholder="email"
					name="email"
				/>
				<ErrorMessage
					component={"span"}
					className="form_error"
					name="email"
				></ErrorMessage>
				<Field
					className="form_input"
					type="password"
					placeholder="password"
					name="password"
				/>
				<ErrorMessage
					component={"span"}
					className="form_error"
					name="password"
				></ErrorMessage>

				<button className={loading ? "disabled" : ""}>
					Регистрация
				</button>
				{statusCode === 200 ? (
					<div className="form_status">
						Вы успешно зарегестрировались
					</div>
				) : statusCode === 400 ? (
					<div className="form_status">
						Произошла ошибка, попробуйте снова
					</div>
				) : (
					""
				)}
			</Form>
		</Formik>
	);
};

export default observer(LRForm);
