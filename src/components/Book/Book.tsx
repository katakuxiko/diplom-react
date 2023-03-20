import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link, useParams } from "react-router-dom";
import { ISList } from "../../models/IList";
import { IItemResponseGet } from "../../models/response/ItemResponse";
import { usersVariablesResponse } from "../../models/response/UsersVariables";
import ItemService from "../../services/ItemService";
import ListService from "../../services/ListService";
import UserService from "../../services/UserService";
import Spinner from "../Spinner/Spinner";

import "./book.scss";

interface BookProps {}
interface BookViewProps {
	loading: boolean;
	setLoading: Dispatch<SetStateAction<boolean>>;
}

const Book: FC<BookProps> = (BookProps) => {
	let { bookId } = useParams();
	const [i, setI] = useState<number>(1);
	const [data, setData] = useState<IItemResponseGet[]>();
	const [dataList, setDataList] = useState<ISList>();
	const [loadings, setLoadings] = useState<boolean>(true);
	const [err, setError] = useState<boolean>();
	const [reset, setReset] = useState<boolean>();
	const [userVarData, setUserVarData] = useState<usersVariablesResponse>();
	useEffect(() => {
		UserService.getAllBooksVariables()
			.then((e) => {
				setUserVarData(e.data);
				console.log(e);
			})
			.finally(() => {
				console.log(userVarData);
			});
	}, []);
	async function Fetch() {
		const result = await ListService.fetchList(bookId).catch((err) => {
			setError(true);
		});
		if (result !== undefined) {
			setDataList(result.data);
			setLoadings(false);
		} else {
			setLoadings(true);
		}
	}
	const Reset = () => {
		if (userVarData !== undefined) {
			UserService.updateAllBooksVar(
				userVarData.variables
					.split(",")
					.filter((e) => e.split(" ")[0] === `book:${bookId}`)
					.map((e) => {
						return e.split(" ")[0] + " " + e.split(" ")[1] + " 0";
					})
					.toString()
			);
			console.log(
				userVarData.variables
					.split(",")
					.filter((e) => e.split(" ")[0] === `book:${bookId}`)
					.map((e) => {
						return e.split(" ")[0] + " " + e.split(" ")[1] + " 0";
					})
					.toString()
			);
			console.log(userVarData.variables);
		}
	};
	useEffect(() => {
		Fetch();
		ItemService.getAllItems(bookId ? bookId : "").then((items) => {
			setData(items.data);
		});
	}, [bookId]);
	useEffect(() => {
		if (i === 2) {
			setLoadings(false);
		}
		setI(i + 1);
	}, [dataList]);

	return (
		<div className="wrapper">
			<div style={{ color: "white" }}>
				{
					loadings ? (
						err ? (
							<h1>Такой страницы нет</h1>
						) : (
							<Spinner />
						)
					) : (
						<>
							{
								<div className="book">
									<div>
										<img src={dataList?.img} alt="" />
										<h1 className={"book_title"}>
											{dataList?.title}
										</h1>
									</div>
									<div className="book_descr">
										<p>{dataList?.description}</p>
										<div className="book_items">
											<h2>Главы</h2>
											<ul>
												{data?.length !== 0 &&
												data !== null ? (
													data?.map((i, intr) => (
														<Link
															key={i.id}
															to={`/book/${bookId}/chapter/${i.id}`}
														>
															<li>
																<p>{i.title}</p>
																<p>
																	Глава №{" "}
																	{intr + 1}
																</p>
																<p></p>
															</li>
														</Link>
													))
												) : (
													<h3>Глав пока ещё нет</h3>
												)}
											</ul>
										</div>
									</div>
								</div>
							}
						</>
					)
					// {dataList?.data.map((data) =><>{data.title}</>)}
					// {data?.map((i) => (
					// 	<h1 key={i.id}>{i.title}</h1>
					// ))}
				}
				<></>
			</div>
			{userVarData !== undefined ? (
				<button className="reset" onClick={() => setReset(true)}>
					Сбросить решения
				</button>
			) : (
				""
			)}

			{reset && (
				<>
					<div
						className="blacker"
						onClick={(e) => {
							if (e.currentTarget.className === "blacker") {
								setReset(false);
							}
						}}
					>
						<div className="modal">
							<div className="modal_content">
								<p>Вы уверены что хотите сбросить решения?</p>
								<div>
									<button onClick={Reset}>Да</button>
									<button
										onClick={() => {
											setReset(false);
										}}
									>
										Нет
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default Book;
