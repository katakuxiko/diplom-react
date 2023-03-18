import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IList from "../../models/IList";
import ListService from "../../services/ListService";

import { ReactSVG } from "react-svg";
import Svg from "./delete.svg";
import SvgEdit from "./edit.svg";
import SvgPlus from "./plus.svg";
import "./MyBooks.scss";
import Spinner from "../Spinner/Spinner";

interface MyBooksProps {}

const MyBooks: FC<MyBooksProps> = () => {
	const [list, setList] = useState<IList>();
	const [loading, setLoading] = useState<boolean>(true);
	async function Fetch() {
		const result = await ListService.fetchMyLists().finally(() => {
			setLoading(false);
		});
		console.log(result);
		if (result.data?.data?.length > 0 && result.data.data !== null) {
			setList(result.data);
			// setLoading(false);
		}
		// } else if (
		// 	result.data === undefined ||
		// 	result.data.data === null ||
		// 	result.data.data.length < 0
		// ) {
		// 	setLoading(false);
		// } else {
		// 	setLoading(true);
		// }
	}

	useEffect(() => {
		Fetch();
	}, []);

	return (
		<div className="container">
			{loading ? (
				<Spinner />
			) : (
				<>
					<section className="myBooks">
						<ul>
							{list?.data !== undefined ? (
								list?.data.map((item) => {
									return (
										<li key={item.id}>
											<div className="wrapper">
												<Link to={`/book/${item.id}`}>
													<img
														src={item.img}
														alt=""
													/>
													<div className="info">
														<div>{item.title}</div>
														<div className="descr">
															{item.description}
														</div>
													</div>
												</Link>
												<ReactSVG
													className="svg"
													onClick={() =>
														ListService.deleteList(
															item.id
														).finally(() => {
															if (
																list.data
																	.length <= 1
															) {
																setLoading(
																	true
																);
															} else {
																Fetch();
															}
														})
													}
													src={Svg}
												></ReactSVG>
												<Link
													to={`/update/book/${item.id}`}
												>
													<ReactSVG
														className="svg"
														src={SvgEdit}
													></ReactSVG>
												</Link>
												<Link
													to={`/edit/book/${item.id}`}
												>
													<ReactSVG
														className="svg"
														src={SvgPlus}
													></ReactSVG>
												</Link>
											</div>
										</li>
									);
								})
							) : (
								<h1 className="result">
									Вы еще не добавили книги
								</h1>
							)}
						</ul>
					</section>
				</>
			)}
		</div>
	);
};

export default MyBooks;
