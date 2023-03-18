import { Link, useParams } from "react-router-dom";
import ListForm from "../components/ListForm/ListForm";
import ListService from "../services/ListService";
import {useState, useEffect} from 'react'
import { ISList } from '../models/IList';

import './UpdateBook.scss'
import ItemService from '../services/ItemService';
import { IItemResponseGet } from '../models/response/ItemResponse';

export default function UpdateBook() {
	let { bookId } = useParams();
	const [dataList, setDataList] = useState<ISList>();
	const [data, setData] = useState<IItemResponseGet[]>();
	const [loadings, setLoadings] = useState<boolean>(true);
	const [err, setError] = useState<boolean>();
	async function Fetch() {
		const result = await ListService.fetchList(bookId).catch((err) => {
			setError(true);
		});
		console.log(result);
		if (result !== undefined) {
			setDataList(result.data);
			setLoadings(false);
		} else {
			setLoadings(true);
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
										to={`/book/${bookId}/chapter/${i.id}`}
									>
										<li>
											<p>{i.title}</p>
											<p>Глава № {i.page}</p>
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
			) : (
				<></>
			)}
		</div>
	);
}
