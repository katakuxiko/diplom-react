import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IItemResponseGet } from "../../models/response/ItemResponse";
import ItemService from "../../services/ItemService";
import "./chapter.scss";

function Chapter() {
  let { chapterId } = useParams();
  const [chapter, setChapter] = useState<IItemResponseGet>();
  useEffect(() => {
    if (chapterId) {
      ItemService.getItemById(chapterId).then((item) => {
        setChapter(item.data);
      });
    } else {
      console.log("Errror");
    }
  }, []);
  return (
    <div className="wrapper">
      <h1>{chapter?.title}</h1>
	  <p>{chapter?.id}</p>
      <MDEditor.Markdown source={chapter?.description} />
    </div>
  );
}

export default Chapter;
