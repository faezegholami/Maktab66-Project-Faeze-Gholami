import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems, itemsSelector } from "../redux/productSlice";
import { fetchCategory, categorySelector } from "../redux/categorySlice";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const { items } = useSelector(itemsSelector);
  const { category } = useSelector(categorySelector);


  useEffect(() => {
    dispatch(fetchItems());
  }, []);
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 10 
  },
    {
      field: "thumbnail",
      headerName: "تصویر",
      width: 50,
     renderCell: (params)=>{
       console.log(params.row.thumbnail);
        return (
          <div>
            <img style={{width:'30px'}} src={params.row.thumbnail} alt='' />
          </div>
        )
      }
    },
    {
      field: "name",
      headerName: "نام کالا",
      width: 150,
    },
    {
      field: "category",
      headerName: "دسته‌بندی",
      width: 110,
    },
    {
      field: "action",
      headerName: "",
      width: 200,
      sortable: false,
      renderCell: () => {
        const onClick = (e) => {
          e.stopPropagation();
          return alert('hi');
        };
        return (
          <>
            <Button onClick={onClick}>ویرایش</Button>
            <Button onClick={onClick}>حذف</Button>
          </>
        );
      },
    },
  ];
  const rows = items.map((item) => {
    return {
      id: item.id,
      thumbnail: `http://localhost:3002/files/${item.thumbnail}`,
      name: item.name,
      category: category.map(el=>{if(el.id==item.category){return el.name}}),
    };
  });
  return (
    <div className="managePage">
      <div className="topTable">
        <h3>مدیریت موجودی و قیمت‌ها</h3>
        <Button variant="contained" color="primary">ذخیره</Button>
      </div>
      <DataGrid rows={rows} columns={columns} autoHeight pageSize={5}/>
    </div>
  );
}
