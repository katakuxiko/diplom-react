import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { action, pageCheck } from "../../helpers";
import { IItemResponseGet } from "../../models/response/ItemResponse";
import ItemService from "../../services/ItemService";
import "./chapter.scss";

function Chapter() {
  console.log('page')
	let { chapterId, bookId } = useParams();
	const [chapter, setChapter] = useState<IItemResponseGet>();
	const [pageChecked, setPageChecked] = useState<boolean>(false);
	const [isBtnActive, setIsBtnActive] = useState<boolean>(true);
	const [chapters, setChapters] = useState<number[]>();
	const navigate = useNavigate();
	useEffect(() => {
		if (chapterId && bookId) {
			ItemService.getItemById(chapterId).then((item) => {
				setChapter(item.data);
			});
			ItemService.getAllItems(bookId).then((items) => {
				setChapters(items.data.map((i) => i.id));
			});
		} else {
			console.log("Errror");
		}
		setIsBtnActive(true);
	}, [chapterId]);

	const nextPage = chapters?.findIndex((i) => chapter?.id === i);

	useEffect(() => {
		setPageChecked(
			pageCheck(
				chapter?.condition ? chapter.condition : "",
				bookId ? bookId : "0"
			)
		);
	}, [chapter, bookId, chapterId]);
	if (chapter?.buttons.length === 0) {
		setIsBtnActive(false);
	}
	useEffect(() => {
		if (!pageChecked && chapters !== undefined && nextPage !== undefined) {
      setTimeout(() => {
			navigate(`/book/${bookId}/chapter/${chapters[nextPage + 1]}`);

      },2000)
		}
	},[pageChecked]);

	return (
		<div className="wrapper">
			{pageChecked ? (
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
												: 0,
											items.btnVar ? items.btnVar : "",
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
					<h2>
						Ваши выбору не соотвествуют этой главе, Вас перерекинет
						к следующей главе через пару секунд
					</h2>
				</div>
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
