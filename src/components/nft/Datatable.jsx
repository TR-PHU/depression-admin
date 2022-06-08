import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { nftColumns } from "../../datatablesource";
import { useState ,useEffect } from "react";
import axios from "axios";

const getAllNFTForAdmin = () => {
  return axios
    .get("https://api.fullstackjourney.club/api/v1/nft/get-all-nft-for-admin")
    .then((res) => {
      return res.data;
    })
    .catch((error) => console.log(error));
};
const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllNFTForAdmin().then((nfts) => {
      setData(nfts);
      console.log(nfts);
    });
  }, []);
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://api.fullstackjourney.club/api/v1/nft/delete-nft/${id}`,
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
        columns={nftColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;
