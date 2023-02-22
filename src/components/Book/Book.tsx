import { FC, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Link, useParams } from "react-router-dom";
import { $api } from "../../http";
import IList from "../../models/IList";
import { IItemResponseGet } from "../../models/response/ItemResponse";
import ItemService from "../../services/ItemService";
import ListService from "../../services/ListService";

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
  const [dataList, setDataList] = useState<IList>();
  const [loadings, setLoadings] = useState<boolean>(true);
  async function Fetch() {
    const result = await ListService.fetchLists();
    console.log(result);
    if (result.data.data.length > 0) {
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
  }, []);
  useEffect(() => {
    if (i === 2) {
      setLoadings(false);
    }
    setI(i + 1);
    console.log(dataList);
  }, [dataList]);

  return (
    <div className="wrapper">
      <div style={{ color: "white" }}>
        {
          loadings ? (
            <>...Загрузка...</>
          ) : (
            <>
              {
                <div className="book">
                  <div>
                    <img src={dataList?.data[0].img} alt="" />
                    <h1>{dataList?.data[0].title}</h1>
                  </div>
                  <div className="book_descr">
                    <p>{dataList?.data[0].description}</p>
                    <div className="book_items">
                      <h2>Главы</h2>
                      <ul>
                        {data?.map((i, intr) => (
                          <Link key={i.id} to={`/book/${bookId}/chapter/${i.id}`}>
                            <li>
                              <p>{i.title}</p>
                              <p>Глава № {intr + 1}</p>
                              <p></p>
                            </li>
                          </Link>
                        ))}
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
    </div>
  );
};

export default Book;