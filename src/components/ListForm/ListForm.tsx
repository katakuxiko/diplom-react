import { ErrorMessage, Form, Field, Formik } from "formik";
import { FC, useContext, useState } from "react";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";

interface ListFormProps {}

const ListForm: FC<ListFormProps> = () => {
  const { store } = useContext(Context);
  const [imgU, setImgU] = useState('')
  const history = useNavigate();
  return (
    <div className="container">
      <Formik
        initialValues={{
          title: "",
          description: "",
          title_img: "",
        }}
        onSubmit={(values) => {
          if (values.title_img === "") {
            values.title_img =
              "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
          }
          store
            .postLists(values.title, values.description, values.title_img)
            .finally(() => {
              values.title = "";
              values.description = "";
              values.title_img = "";
              history("/");
            });
        }}
      >
        <Form className="list_form">
          <img className="list_img" src={imgU} alt="" />
          <Field
            className="list_field"
            name="title"
            placeholder="Название"
            type="text"
          ></Field>
          <ErrorMessage name="title"></ErrorMessage>
          <Field
            className="list_field"
            type="url"
            name="title_img"
            placeholder="url вашей картинки"
            onBlur={(e: any) => {
              setImgU(e.target.value);
            }}
          ></Field>
          <ErrorMessage name="title_img"></ErrorMessage>
          <Field
            className="list_field"
            name="description"
            placeholder="Описание"
            type="text"
          ></Field>
          <ErrorMessage name="description"></ErrorMessage>
          <button className="list_btn">Click</button>
        </Form>
      </Formik>
    </div>
  );
};

export default ListForm;
