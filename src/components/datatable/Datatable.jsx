import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { useState ,useEffect } from "react";
import axios from "axios";

const token = localStorage.getItem("token");
const getAllUser = () => {
  return axios
    .get("https://api.fullstackjourney.club/api/v1/user/get-all-user", {headers: {Authorization: `token ${token}`}})
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};
const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllUser().then((users) => {
      setData(users);
      console.log(users);
    });
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.fullstackjourney.club/api/v1/user/delete-user/${id}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      alert(error.message);
    }
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
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
