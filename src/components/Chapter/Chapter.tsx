import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { action, pageCheck } from '../../helpers';
import { IItemResponseGet } from "../../models/response/ItemResponse";
import ItemService from "../../services/ItemService";
import "./chapter.scss";

function Chapter() {
  let { chapterId, bookId } = useParams();
  const [chapter, setChapter] = useState<IItemResponseGet>();
  const [pageChecked, setPageChecked] = useState<boolean>(false)

  useEffect(()=>{
    setPageChecked(pageCheck(
        chapter?.condition ? chapter.condition : "",
        bookId ? bookId : "0"
      ) );
  },[chapter,bookId, chapterId])
  
  console.log(chapter);

  useEffect(() => {
    if (chapterId) {
      ItemService.getItemById(chapterId).then((item) => {
        setChapter(item.data);
      });
    } else {
      console.log("Errror");
    }
  }, [chapterId]);
  return (
    <div className="wrapper">
      {pageChecked ? (
        <>
          <h1>{chapter?.title}</h1>
          <p>{chapter?.id}</p>
          <MDEditor.Markdown source={chapter?.description} />
          {chapter?.buttons.map((items) => (
            <button
              onClick={() =>
                action(
                  items.btnAction
                    ? items.btnAction
                    : 0,
                  items.btnVar ? items.btnVar : "",
                  bookId ? bookId : "0"
                )
              }
            >
              {items.btnName}
            </button>
          ))}
        </>
      ) : (
        <h2>Ваши выбору не соотвествуют этой главе</h2>
      )}
    </div>
  );
}

export default Chapter;
