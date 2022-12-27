import { observer } from "mobx-react-lite";
import { FC, useContext, useEffect, useState, FunctionComponent } from "react";

import { Context } from "../..";
import IList from "../../models/IList";
import ListService from "../../services/ListService";
import "./chart.scss";

function Chart() {
  const [list, setList] = useState<IList>();
  
  async function Fetch() {
    const result = await ListService.fetchLists();
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
        <ChartItem list={list}></ChartItem>
      </div>

      <div className="chart_column">
        <h2>Топ по оценкам</h2>
        <ChartItem list={list}></ChartItem>
      </div>
      <div className="chart_column">
        <h2>Лучшее</h2>
        <ChartItem list={list}></ChartItem>
      </div>
    </section>
  );
}
interface ChartItemProps {
  list: IList|undefined;
}

const ChartItem: FC<ChartItemProps> = (
  props: ChartItemProps
) => {
   return (
     <>
       {props.list?.data?.map((data,i) => {
         return (
           <div className="chart_column_item">
             <img
               src={data.img}
               alt=""
               className="chart_column_item_img"
             />
             <div className="chart_column_item_text">
               <h3 className="chart_column_item_title">{data.title}</h3>
               <p className="chart_column_item_descr">{data.description}</p>
             </div>
           </div>
         );
       })}{" "}
     </>
   );
};

export default observer(Chart);
