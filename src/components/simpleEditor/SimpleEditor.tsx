import { FC, useState } from 'react';
import './simpleEditor.scss'
import MDEditor from '@uiw/react-md-editor';
import { useParams } from 'react-router-dom';
import ItemService from '../../services/ItemService';

interface SimpleEditorProps {
}
 
const SimpleEditor:FC<SimpleEditorProps> = () => {
	const [value, setValue] = useState<string>("Initial value");
const [inputValue, setInputValue] = useState<string>("Название главы");
  const [response, setResponse] = useState<number>()
  const [btnActive, setBtnActive] = useState<boolean>(true);
  let {bookId} = useParams();
  return (
    <div className="mde__wrapper">
      <input value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
      <MDEditor
        value={value}
        onChange={(val) => {
          val && setValue(val);
        }}
      />
      {response&&<h2 style={{color:'white'}}>Страница с айди {response} успешно отправлена</h2>}
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
      <button
        disabled={!btnActive}
        onClick={() => {
          setBtnActive(false);
          ItemService.postItem(bookId?bookId:'', inputValue, value).then(e=>{
            setResponse(e.data.id);
            setValue('');
            setBtnActive(true);

          }).catch(e => {
            console.log(e);
          });
        }}
      >
        asdasdsad
      </button>
      <button
        onClick={() => {
          setValue(value + `<button class="val"></button>`);
        }}
      >
        Добавить кнопку
      </button>
      {/* <ReactMarkdown rehypePlugins={rehypeRaw} children={value} />, */}
    </div>
  );
  
}
 
export default SimpleEditor;