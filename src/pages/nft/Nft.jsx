/* eslint-disable no-unused-vars */
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/nft/Datatable";
import axios from "axios";
import "./nft.scss";

const Nft = () => {
  const handleChangeImg = async (e) => {
    const files = Array.from(e.target.files);
    let formData = new FormData();

    files.forEach((file) => formData.append("nft", file));
    const token = localStorage.getItem("token");

    try {
      const res = await axios({
        method: "POST",
        url: "https://api.fullstackjourney.club/api/v1/nft/upload",
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      });
      alert("Upload nft thành công");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="list">
      <Sidebar />

      <div className="listContainer">
        <Navbar />
        <div className="listGrid">
          <h2 className="label">Thêm NFTs:</h2>
          <div>
            <input
              type="file"
              name="image"
              multiple
              onChange={handleChangeImg}
            />
          </div>
        </div>
        <Datatable />
      </div>
    </div>
  );
};

export default Nft;
