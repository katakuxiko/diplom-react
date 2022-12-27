import { FC, useEffect, useState } from "react";
import IList from "../../models/IList";
import ListService from "../../services/ListService";
import DeleteD from "../img/deleteD.png";
import Edit from "../img/edit.png";
import "./MyBooks.scss";

interface MyBooksProps {}

const MyBooks: FC<MyBooksProps> = () => {
  const [list, setList] = useState<IList>();
  const [loading, setLoading] = useState<boolean>(true);	
  async function Fetch() {
    const result = await ListService.fetchLists();
    console.log(result);
	if (result.data.data.length > 0) {
		setList(result.data);
		setLoading(false);
	} else{
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
          {!loading?list?.data.map((item) => {
            return (
              <li>
                <img src={item.img} alt="" />
                <div className="info">
                  <div>{item.title}</div>
                  <div className="descr">{item.description}</div>
                </div>
                <button
                  onClick={() =>
                    ListService.deleteList(item.id).finally(() => {
						if(list.data.length<=1){
							setLoading(true);
						} else{
							Fetch();
						}
						
                    })
                  }
                >
                  <img src={DeleteD} alt="" />
                </button>
                <button>
                  <img src={Edit} alt="" />
                </button>
              </li>
            );
          }):<li className={'result'}>Нет результатов</li>}
        </ul>
      </section>
    </div>
  );
};

export default MyBooks;
