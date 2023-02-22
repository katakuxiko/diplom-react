import { FC, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import IList from "../../models/IList";
import ListService from "../../services/ListService";
import DeleteD from "../img/deleteD.png";
import Edit from "../img/edit.png";
import { ReactSVG } from "react-svg";
import Svg from "./delete.svg"
import SvgEdit from "./edit.svg";
import ModalEdit from "../modalEdit/ModalEdit";
import "./MyBooks.scss";

interface MyBooksProps {}

const MyBooks: FC<MyBooksProps> = () => {
  const [list, setList] = useState<IList>();
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState(false);
  async function Fetch() {
    const result = await ListService.fetchLists();
    console.log(result);
    if (result.data.data.length > 0) {
      setList(result.data);
      setLoading(false);
    } else {
      setLoading(true);
    }
  }

  useEffect(() => {
    Fetch();
  }, []);

  return (
    <div className="container">
      <section className="myBooks">
        <ul>
          {!loading ? (
            list?.data.map((item) => {
              return (
                <li>
                  <div className="wrapper">
                    <Link to={`/book/${item.id}`}>
                      <img src={item.img} alt="" />
                      <div className="info">
                        <div>{item.title}</div>
                        <div className="descr">{item.description}</div>
                      </div>
                    </Link>
                    {/* <button
                      onClick={() =>
                        ListService.deleteList(item.id).finally(() => {
                          if (list.data.length <= 1) {
                            setLoading(true);
                          } else {
                            Fetch();
                          }
                        })
                      }
                    >
                      <img src={DeleteD} alt="" />
                    </button> */}
                    <ReactSVG
                      className="svg"
                      onClick={() =>
                        ListService.deleteList(item.id).finally(() => {
                          if (list.data.length <= 1) {
                            setLoading(true);
                          } else {
                            Fetch();
                          }
                        })
                      }
                      src={Svg}
                    ></ReactSVG>
                    <Link to={`/edit/book/${item.id}`}>
                      <ReactSVG className="svg" src={SvgEdit}></ReactSVG>
                    </Link>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="result">Нет результатов</li>
          )}
          
        </ul>
      </section>
    </div>
  );
};

export default MyBooks;