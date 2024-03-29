import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
	action,
	getAllBooksVar,
	pageCheck,
	UpdataAllBooksVariable,
} from "../../helpers";
import { IItemResponseGet } from "../../models/response/ItemResponse";
import { usersVariablesResponse } from "../../models/response/UsersVariables";
import ItemService from "../../services/ItemService";
import UserService from "../../services/UserService";
import Spinner from "../Spinner/Spinner";
import "./chapter.scss";

function Chapter() {
	let { chapterId, bookId } = useParams();
	const [chapter, setChapter] = useState<IItemResponseGet>();
	const [pageChecked, setPageChecked] = useState<boolean>();
	const [loading, setLoading] = useState<boolean>(false);
	const [isBtnActive, setIsBtnActive] = useState<boolean>(true);
	const [isBtnClicked, setIsBtnClicked] = useState<boolean>(true);
	const [nextChapterid, setNextChapterId] = useState<number>();
	const [usersVariables, setUsersVariables] =
		useState<usersVariablesResponse>();

	useEffect(() => {
		UserService.getAllBooksVariables()
			.then((variable) => setUsersVariables(variable.data))
			.finally(() => {
				setIsBtnClicked(false);
			});
		localStorage.setItem(`lastChapter_book_${bookId}`,`${chapterId}`)
	}, [chapterId, bookId]);
	useEffect(() => {
		if (chapterId && bookId && chapterId !== "0") {
			ItemService.getItemById(chapterId).then((item) => {
				setChapter(item.data);
				console.log(item.data);
				setLoading(true);
				setPageChecked(
					pageCheck(item.data.condition, bookId ? bookId : "0")
				);
			});
			
		} else {
			console.log("Errror");
			setLoading(true)
		}
	}, [chapterId, bookId, usersVariables]);
	useEffect(() => {
		if (usersVariables) {
			getAllBooksVar(usersVariables.variables);
		}
	}, [usersVariables, chapterId, bookId]);
	
	useEffect(() => {
		if (chapterId === "undefined") {
			setPageChecked(false);
		}
		setLoading(false);

		setIsBtnActive(true);
	}, [bookId, chapterId]);

	return (
		<div className="wrapper">
			{loading ? (
				pageChecked ? (
					<>
						<h1>{chapter?.title}</h1>
						<MDEditor.Markdown source={chapter?.description} />
						{chapter?.buttons.length !== 0
							? chapter?.buttons.map((items, i) => (
									<button
										className="action_btn"
										key={i}
										disabled={isBtnClicked || !isBtnActive}
										onClick={() => {
											setIsBtnClicked(true);
											setTimeout(()=>{
												ItemService.getNextPageId(
													bookId ? bookId : "0",
													UpdataAllBooksVariable(),
													chapter.page
												).then((data) => {
													setIsBtnActive(false);
													console.log(data);
													setNextChapterId(data.data);
												});
											},300)
											
											
											action(
												items.btnAction
													? items.btnAction
													: "",
												items.btnVar
													? items.btnVar
													: "",
												bookId ? bookId : "0"
											);
										}}
									>
										{items.btnName}
									</button>
							  ))
							: ""}
					</>
				) : (
					<div>
						{chapterId === "undefined" || chapterId === "0" ? (
							<>
								<h1>Это конец</h1>
								<Link to={`/book/${bookId}`}>
									На страницу тайтла
								</Link>
							</>
						) : (
							<h1>
								<h2>
									Ваши выбору не соотвествуют этой главе, Вас
									перерекинет к следующей главе через пару
									секунд
								</h2>
								{nextChapterid !== undefined ? (
									nextChapterid !== 0 ? (
										<Link
											to={`/book/${bookId}/chapter/${nextChapterid}`}
										>
											Следующая страница
										</Link>
									) : (
										<Link
											to={`/book/${bookId}/chapter/undefined`}
										>
											Следующая страница
										</Link>
									)
								) : (
									""
								)}
							</h1>
						)}
					</div>
				)
			) : (
				<Spinner></Spinner>
			)}

			{!isBtnActive &&
			nextChapterid !== undefined ? (
				nextChapterid !== 0 ? (
					<Link to={`/book/${bookId}/chapter/${nextChapterid}`}>
						Следующая страница
					</Link>
				) : (
					<Link to={`/book/${bookId}`}>На страницу тайтла</Link>
				)
			) : (
				""
			)}
		</div>
	);
}

export default Chapter;
