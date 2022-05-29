import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { api } from "../redux/api";
import service from "../redux/http";
import * as Yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "300px",
  overflow: "auto",
};

export default function BasicModal({ category, name, item,setState,state }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [gallery, setGallery] = useState([]);
  const [des, setDes] = useState();
// console.log(item);
  const formik = useFormik({
    initialValues: {
      id: uuidv4(),
      image:'',
      name: "",
      category: "",
      price: "",
      count: "",
      description: "",
    },
    validationSchema: Yup.object({
      image: Yup.string().required("وارد کردن حداقل یک تصویر الزامی است!"),
      name: Yup.string().required("وارد کردن نام کالا الزامی است!"),
      category: Yup.string().required("وارد کردن دسته بندی کالا الزامی است!"),
      price: Yup.number().typeError('فقط مقدار عددی مجاز است').required("وارد کردن قیمت کالا الزامی است!"),
      count: Yup.number().typeError("فقط مقدار عددی مجاز است").required("وارد کردن تعداد کالا الزامی است!"),
      
    }),
    onSubmit: () => {
      alert("اطلاعات شما با موفقیت ثبت گردید");
      service.creatProduct(data);
      setGallery([]);
      handleClose();
      formik.values.id = uuidv4();
      setState(!state)
      
    },
  });

  const data = {
    id: formik.values.id,
    name: formik.values.name,
    category: formik.values.category,
    price: formik.values.price,
    count: formik.values.count,
    description: des,
    image: gallery,
    thumbnail: gallery[0],
    createdAt: new Date().getTime(),
  };

  //get images as file
  const selectFileHandler = (e) => {
    formik.setFieldValue("image", e.currentTarget.files[0]);
  };
  //save photos in gallery
  const uploadHandler = () => {
    const formData = new FormData();
    Object.entries(formik.values).map((item) => {
      formData.append(item[0], item[1]);
    });
    api
      .post("/upload", formData, {})
      .then((res) => setGallery((gallery) => [...gallery, res.data.filename]));
  };
  //save description
  const onContentStateChange = (context) => {
    setDes(context.blocks[0].text);
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        {name}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="formBody">
          <form
            onSubmit={formik.handleSubmit}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="img">تصویر کالا</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={selectFileHandler}
              onBlur={formik.handleBlur}
            />
            {formik.touched.image && formik.errors.image ? (
            <div className="error1">{formik.errors.image }</div>
          ) : null}
            <button type="button" onClick={uploadHandler}>
              آپلود
            </button>
            <div className="thumbnail">
              {gallery.map((photo) => (
                <img
                  src={`http://localhost:3002/files/${photo}`}
                  key={uuidv4()}
                />
              ))}
            </div>

            <label htmlFor="name">نام کالا</label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

              value={item?.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <div className="error1">{formik.errors.name}</div>
            ) : null}
            <label htmlFor="category">دسته بندی</label>
            <select
              value={item?.category}
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {category?.map((name) => (
                <option value={name.id} key={name.id}>
                  {name?.name}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="error1">{formik.errors.category}</div>
            ) : null}
            <label htmlFor="price">قیمت</label>
            <input
              id="price"
              name="price"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={item?.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className="error1">{formik.errors.price}</div>
            ) : null}
            <label htmlFor="count">تعداد</label>
            <input
              id="count"
              name="count"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

              value={item?.count}
            />
            {formik.touched.count && formik.errors.count ? (
              <div className="error1">{formik.errors.count}</div>
            ) : null}
            <Editor
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onContentStateChange={onContentStateChange}
              
            />
            
            <button type="submit">ذخیره</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
