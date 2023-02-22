import { ErrorMessage, Form, Field, Formik } from "formik";
import { FC, useContext, useState } from "react";
import { Context } from "../..";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";


interface ListFormProps {
   isEdit: boolean;
   title: string;
   title_img: string;
   description: string;
}

const ListForm: FC<ListFormProps> = (props: ListFormProps) => {
  const { store } = useContext(Context);
  const [imgU, setImgU] = useState('')
  const history = useNavigate();
  return (
    <div className="container">
      <div className="form_layot">
        <Formik
          initialValues={{
            title: props.title,
            description: props.description,
            title_img: props.title_img,
          }}
          validationSchema={Yup.object({
            title: Yup.string()
              .required("required")
              .min(4, "Не менее 4 символов"),
            title_img: Yup.string().url("Должна быть ссылка"),
            description: Yup.string().min(
              15,
              "Описание не должно быть маленьким"
            ),
          })}
          onSubmit={(values) => {
            if (values.title_img === "") {
              values.title_img =
                "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
            }
            if (props.isEdit) {
              console.log("edit");
            } else {
              console.log("not edit");
              store
                .postLists(values.title, values.description, values.title_img)
                .finally(() => {
                  values.title = "";
                  values.description = "";
                  values.title_img = "";
                  history("/");
                });
            }
          }}
        >
          <Form className="list_form">
            {imgU !== "" ? <img className="list_img" src={imgU} alt="" /> : ""}
            <Field
              className="list_field"
              name="title"
              placeholder="Название"
              type="text"
            ></Field>

            <Field
              className="list_field"
              type="url"
              name="title_img"
              placeholder="url вашей картинки"
              onBlur={(e: any) => {
                setImgU(e.target.value);
              }}
            ></Field>
            <Field
            as='textarea'
              className="list_field"
              name="description"
              placeholder="Описание"
              
              type="textarea"
            ></Field>
            <button className="list_btn">Click</button>
            <ErrorMessage
              className="Error"
              component={"div"}
              name="title"
            ></ErrorMessage>
            <ErrorMessage
              className="Error"
              component={"div"}
              name="description"
            ></ErrorMessage>
            <ErrorMessage
              className="Error"
              component={"div"}
              name="title_img"
            ></ErrorMessage>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ListForm;
