import { Link, useParams } from "react-router-dom";
import ListForm from "../ListForm/ListForm";
import ListService from "../../services/ListService";
import { useState, useEffect } from "react";
import { ISList } from "../../models/IList";

import "./UpdateBook.scss";
import ItemService from "../../services/ItemService";
import { IItemResponseGet } from "../../models/response/ItemResponse";
import Spinner from "../Spinner/Spinner";

export default function UpdateBook() {
	let { bookId } = useParams();
	const [dataList, setDataList] = useState<ISList>();
	const [data, setData] = useState<IItemResponseGet[]>();
	const [loadings, setLoadings] = useState<boolean>(true);
	const [err, setError] = useState<boolean>();
	async function Fetch() {
		const result = await ListService.fetchList(bookId)
			.catch((err) => {
				console.log(err);
				setError(true);
				setLoadings(false);
			})

			.finally(() => {
				setLoadings(false);
			});
		if (result !== undefined) {
			setDataList(result.data);
		}
	}

	useEffect(() => {
		Fetch();
		ItemService.getAllItems(bookId ? bookId : "").then((items) => {
			setData(items.data);
		});
	}, [bookId]);
	return (
		<div className="wrapper">
			{dataList !== undefined ? (
				<div className="content">
					<ListForm
						isEdit={true}
						title={dataList?.title}
						description={dataList.description}
						title_img={dataList.img}
					/>
					<div>
						<ul>
							{data?.length !== 0 && data !== null ? (
								data?.map((i, intr) => (
									<Link
										key={i.id}
										to={`/book/${bookId}/chapter/${i.id}/update`}
									>
										<li>
											<p>
												Название главы - {i.title},
												Страница - {i.page}
											</p>
										</li>
									</Link>
								))
							) : (
								<h3>Глав пока ещё нет</h3>
							)}
						</ul>
					</div>
				</div>
			) : err ? (
				<h2>Ошибка</h2>
			) : (
				<Spinner />
			)}
		</div>
	);
}
