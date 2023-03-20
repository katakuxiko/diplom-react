import { FC, useContext, useEffect } from "react";
import "../scss/style.scss";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Chart from "../chart/Chart";
import NewBooks from "../newBooks/NewBooks";
import LoginForm from "../LoginForm/LoginForm";
import ListForm from "../ListForm/ListForm";
import MyBooks from "../myBooks/MyBooks";
import Profile from "../profile/Profile";
import SimpleEditor from "../simpleEditor/SimpleEditor";
import Book from "../Book/Book";
import WithLayout from "../HOC/WithLayout";
import Chapter from "../Chapter/Chapter";
import UpdateBook from "../updateBook/UpdateBook";
import UpdateChapter from "../UpdateChapter/UpdateChapter";

const App: FC = () => {
	const { store } = useContext(Context);
	useEffect(() => {
		if (localStorage.getItem("token")) {
			store.setAuth(true);
			store.checkAuth();
			store.refresh().catch(() => {
				localStorage.removeItem("token");
				store.setAuth(false);
			});
		}
	}, [store]);
	if (store.isLoading) {
		return <div>Загрузка...</div>;
	}
	if (!store.isAuth) {
		return <LoginForm />;
	}

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<div className="main">
								<WithLayout>
									<div className="container">
										<NewBooks></NewBooks>
										<Chart></Chart>
									</div>
								</WithLayout>
							</div>
						}
					></Route>
					<Route
						path="/books"
						element={
							<>
								<WithLayout>
									<ListForm
										title=""
										title_img=""
										description=""
										isEdit={false}
									></ListForm>
								</WithLayout>
							</>
						}
					></Route>
					<Route
						path="/My/books"
						element={
							<>
								<WithLayout>
									<MyBooks></MyBooks>
								</WithLayout>
							</>
						}
					></Route>
					<Route
						path="/My/Profile"
						element={
							<>
								<WithLayout>
									<Profile></Profile>
								</WithLayout>
							</>
						}
					></Route>
					<Route
						path="/edit/book/:bookId"
						element={
							<>
								<WithLayout>
									<SimpleEditor></SimpleEditor>
								</WithLayout>
							</>
						}
					/>
					<Route
						path="/update/book/:bookId"
						element={
							<>
								<WithLayout>
									<UpdateBook></UpdateBook>
								</WithLayout>
							</>
						}
					/>
					<Route
						path="/book/:bookId"
						element={
							<>
								<WithLayout>
									<Book></Book>
								</WithLayout>
							</>
						}
					/>
					<Route
						path="/book/:bookId/chapter/:chapterId"
						element={
							<>
								<WithLayout>
									<Chapter></Chapter>
								</WithLayout>
							</>
						}
					/>
					<Route
						path="/book/:bookId/chapter/:chapterId/update"
						element={
							<>
								<WithLayout>
									<UpdateChapter></UpdateChapter>
								</WithLayout>
							</>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default observer(App);
