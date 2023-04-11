import { useEffect, useState } from "react";
import "./new-books.scss";
import IList from "../../models/IList";
import ListService from "../../services/ListService";
import Spinner from "../Spinner/Spinner";

function NewBooks() {
	const [list, setList] = useState<IList>();
	const [loading, setLoading] = useState<boolean>(true);

	async function Fetch() {
		setLoading(true);
		const result = await ListService.fetchLists(5).finally(() =>
			setLoading(false)
		);
		console.log(result);
		setList(result.data);
	}

	useEffect(() => {
		Fetch();
	}, []);
	if (loading) {
		return <Spinner />;
	}
	return (
		<section className="new_books">
			<div className="new_books_cards">
				<h2>Новые книги</h2>
				{list?.data.map((li) => (
					<div className="card">
						<a href={`/book/${li.id}`}>
							<img
								src={li.img}
								alt={li.title}
							/>
							<h2>{li.title}</h2>
						</a>
					</div>
				))}
			</div>
		</section>
	);
}

export default NewBooks;
