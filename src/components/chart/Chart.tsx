import { observer } from "mobx-react-lite";
import { FC, useEffect, useState } from "react";
import { Link } from 'react-router-dom';

import IList from "../../models/IList";
import ListService from "../../services/ListService";
import Spinner from '../Spinner/Spinner';
import "./chart.scss";

function Chart() {
  const [list, setList] = useState<IList>();
  const [loading,setLoading] = useState<boolean>(true);
  
  async function Fetch() {
    setLoading(true);
    const result = await ListService.fetchLists(7).finally(() => setLoading(false));
    console.log(result);
    setList(result.data);
  }

  useEffect(() => {
    Fetch();
  }, []);
  return (
    <section className="chart">
      
      <div className="chart_column">
        <h2>Топ по просмотрам</h2>
        <ChartItem loading={loading} list={list}></ChartItem>
      </div>

      <div className="chart_column">
        <h2>Топ по оценкам</h2>
        <ChartItem loading={loading} list={list}></ChartItem>
      </div>
      <div className="chart_column">
        <h2>Лучшее</h2>
        <ChartItem loading={loading} list={list}></ChartItem>
      </div>
    </section>
  );
}
interface ChartItemProps {
  list: IList|undefined;
  loading: boolean;
}

const ChartItem: FC<ChartItemProps> = (
  props: ChartItemProps,
) => {
   return (
     <>
       {props.loading ? <Spinner></Spinner> : ""}
       {props.list?.data?.map((data, i) => {
         return (
				<div className="chart_column_item" key={i}>
					<Link
						to={`book/${data.id}`}
						className="chart_column_item_img"
					>
						<img
							src={data.img}
							alt=""
							className="chart_column_item_img_img"
						/>
					</Link>

					<div className="chart_column_item_text">
						<h3 className="chart_column_item_title">
							{data.title}
						</h3>
						<p className="chart_column_item_descr">
							{data.description}
						</p>
					</div>
				</div>
			);
       })}{" "}
     </>
   );
};

export default observer(Chart);
