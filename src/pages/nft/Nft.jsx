/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";

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
        alert("Upload nft thành công")
    } catch (error) {
        alert(error.message)
    }
  };

  return (
    <div className="w-auto min-h-full">
    <div className="w-full h-full flex justify-center items-center flex-col gap-14 py-20">
      <div className="flex gap-5 items-center">
        <label className="m-0 p-0 w-auto h-full">Thêm file excel:</label>
        <div>
          <input
            className="w-full"
            type="file"
            name="image"
            multiple
            onChange={handleChangeImg}
          />
        </div>
      </div>
    </div>
  </div>
  );
};

export default Nft;
