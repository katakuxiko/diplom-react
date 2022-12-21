import ('./chart.scss')

function Chart(){

	return(
		<section className="chart">
			<div className="chart_column">
				<h2>Топ по просмотрам</h2>
				<div className="chart_column_item">
					<img src="https://primepublish.ru/content/images/new-elements/elems/step-3-15.png" alt="" className="chart_column_item_img" />
					<div className="chart_column_item_text">
					<h3 className="chart_column_item_title">Лавр</h3>
					<p className="chart_column_item_descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugiat minima laboriosam natus</p>
					</div>
				</div>
				<div className="chart_column_item">
					<img src="https://binaries.templates.cdn.office.net/support/templates/ru-ru/lt22301254_quantized.png" alt="" className="chart_column_item_img" />
					<div className="chart_column_item_text">
						<h3 className="chart_column_item_title">Название книги</h3>
						<p className="chart_column_item_descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugiat minima laboriosam natus</p>
					</div>
				</div>
				<div className="chart_column_item">
					<img src="https://1757140519.rsc.cdn77.org/blog/wp-content/uploads/sites/2/2020/03/6-1.jpg" className="chart_column_item_img" alt="" />
					<div className="chart_column_item_text">
						<h3 className="chart_column_item_title">До встречи с тобой</h3>
						<p className="chart_column_item_descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugiat minima laboriosam natus</p>
					</div>
				</div>
				<div className="chart_column_item">
					<img src="https://www.sostav.ru/images/news/2022/04/08/d5bazwrc.png" alt="" className="chart_column_item_img" />
					<div className="chart_column_item_text">
						<h3 className="chart_column_item_title">Какие большие зубки</h3>
						<p className="chart_column_item_descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugiat minima laboriosam natus</p>
					</div>
				</div>
				<div className="chart_column_item">
					<img src="https://upload.wikimedia.org/wikipedia/ru/1/10/%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%BA%D0%BD%D0%B8%D0%B3%D0%B8_%22%D0%9D%D0%B0%D0%B2%D0%B0%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F%22%2C_%D0%9C%D0%B0%D0%BA%D1%81_%D0%A4%D1%80%D0%B0%D0%B9.jpg" alt="" className="chart_column_item_img" />
					<div className="chart_column_item_text">
						<h3 className="chart_column_item_title">Наваждения книги зубки тобой asd...</h3>
						<p className="chart_column_item_descr">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam fugiat minima laboriosam natus</p>
					</div>
				</div>
			</div>
			
			<div className="chart_column">
				<h2>Топ по оценкам</h2>

			</div>
			<div className="chart_column">
				<h2>Лучшее</h2>

			</div>
		</section>
	)
}

export default Chart