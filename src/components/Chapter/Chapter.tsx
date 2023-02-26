import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { action, pageCheck } from "../../helpers";
import { IItemResponseGet } from "../../models/response/ItemResponse";
import ItemService from "../../services/ItemService";
import Spinner from '../Spinner/Spinner';
import "./chapter.scss";

function Chapter() {
	console.log("page");
	let { chapterId, bookId } = useParams();
	const [chapter, setChapter] = useState<IItemResponseGet>();
	const [pageChecked, setPageChecked] = useState<boolean>();
	const [loading, setLoading] = useState<boolean>(false);
	const [isBtnActive, setIsBtnActive] = useState<boolean>(true);
	const [chapters, setChapters] = useState<number[]>();
	const navigate = useNavigate();

	useEffect(() => {
		if (chapterId && bookId) {
			ItemService.getItemById(chapterId).then((item) => {
				setChapter(item.data);
				setLoading(true);
				setPageChecked(
					pageCheck(
						item.data.condition,
						bookId ? bookId : "0"
					)
				);
			});
			ItemService.getAllItems(bookId).then((items) => {
				setChapters(items.data.map((i) => i.id));
			});
		} else {
			console.log("Errror");
		}
		setIsBtnActive(true);
	}, [chapterId, bookId]);

	const nextPage = chapters?.findIndex((i) => chapter?.id === i);

	useEffect(() => {
		// setPageChecked(
		// 	pageCheck(
		// 		chapter?.condition ? chapter.condition : "",
		// 		bookId ? bookId : "0"
		// 	)
		// );
		if (chapterId === "undefined") {
			setPageChecked(false);
		}
	}, [chapter, bookId, chapterId]);
	if (chapter?.buttons.length === 0) {
		setIsBtnActive(false);
	}
	console.log(chapters)

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
										key={i}
										disabled={!isBtnActive}
										onClick={() => {
											setIsBtnActive(false);
											action(
												items.btnAction
													? items.btnAction
													: '',
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
						{chapterId === "undefined" ? (
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
								{
								nextPage !== undefined &&
								chapters !== undefined ? (
									<Link
										to={`/book/${bookId}/chapter/${
											chapters[nextPage + 1]
										}`}
									>
										Следующая страница
									</Link>
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
			nextPage !== undefined &&
			chapters !== undefined ? (
				<Link to={`/book/${bookId}/chapter/${chapters[nextPage + 1]}`}>
					Следующая страница
				</Link>
			) : (
				""
			)}
		</div>
	);
}

export default Chapter;
