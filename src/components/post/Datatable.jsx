import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { postColumns } from "../../datatablesource";
import { useState ,useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem("token");
const getAllPosts = () => {
  return axios
    .get("https://api.fullstackjourney.club/api/v1/post/get-all-post-for-admin", {headers: {Authorization: `token ${token}`}})
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};
const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllPosts().then((posts) => {
      setData(posts);
      console.log(posts);
    });
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.fullstackjourney.club/api/v1/post/delete-post-admin/${id}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
    } catch (error) {
      alert(error.message);
    }
    setData(data.filter((item) => item._id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        getRowId={(row) => row._id}
        columns={postColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
