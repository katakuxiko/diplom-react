import SimpleEditor from '../simpleEditor/SimpleEditor'
import { useState, useEffect } from 'react';
import { IItemResponseGet } from '../../models/response/ItemResponse';
import ItemService from '../../services/ItemService';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

function UpdateChapter() {
	let { chapterId, bookId } = useParams();
	const [chapter, setChapter] = useState<IItemResponseGet>();
	const [loading, setLoading] = useState<boolean>(true);
	useEffect(() => {
		if (chapterId && bookId && chapterId !== "0") {
			ItemService.getItemById(chapterId).then((item) => {
				setChapter(item.data);
				console.log(item.data);
				
			}).finally(()=>{
				setLoading(false);
			});
		} else {
			setLoading(true);
		}
	}, [chapterId, bookId]);
  return (
		<div>
			{loading ? <Spinner /> : <SimpleEditor isEdit inVal={chapter} />}
		</div>
  );
}

export default UpdateChapter