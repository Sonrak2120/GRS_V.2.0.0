import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";

import "./drop-file-input.css";

import { ImageConfig } from "../config/ImageConfig";
import uploadImg from "../../assets/uploadfile/cloud-upload-regular-240.png";

const DropFileInputHTML = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const [loading, setLoading] = React.useState(false);

  const onFileDrop = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile({ file, id: fileList.length, flag: false });
      };
      console.log("file", file);
      console.log("file2", { file, id: 1 });

      const updatedList = [
        ...fileList,
        { file, id: fileList.length, flag: false },
      ];
      setFileList(updatedList);
      props.onFileChange(updatedList);
      reader.readAsDataURL(file);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  const handledownload = () => {
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(file.file);
    a.download = file.file.name;
    a.click();
  };

  const [file, setFile] = useState({});
  const token = sessionStorage.getItem("token");

  const onClickUpload = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file.file);
      const Updatecourse = await axios({
        method: "post",
        url: "http://34.124.184.200:5000/upload-zip",
        data: formData,
        headers: {
          Authorization: `Bearer ` + token,
          Accept: "*/*",
        },
      });
      const uploadThisfile = fileList.map((item) => {
        if (item.id === file.id) {
          return { ...item, flag: true };
        }
        return item;
      });
      setLoading(true);
      setFileList(uploadThisfile);
      console.log("uploadThisfile", uploadThisfile);

      alert("บันทึกข้อมูลแล้ว");
      console.log(Updatecourse);

      window.location.assign("/teacher");
      // window.location.reload("Refresh");
    } catch {
      setLoading(false);
      alert("Error อัปโหลดไฟล์ไม่ถูกต้อง");
    }
  };
  console.log("fileList", fileList);
  console.log("fileList", !(fileList.length === 0));
  return (
    <div>
      <Progess load={loading} />
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        style={{ marginLeft: "auto", marginRight: "auto" }}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>โปรดเลือกและอัปโหลด ไฟล์ .zip เท่านั้น</p>
        </div>
        <input
          disabled={
            !(fileList.length === 0) &&
            !(fileList.filter((item) => !item.flag).length === 0)
          }
          type="file"
          value=""
          accept=".rar,.zip"
          ID="fileSelect"
          runat="server"
          onChange={onFileDrop}
        />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">ไฟล์ที่อัปโหลด</p>
          {fileList.map((item, index) => (
            <div
              key={index.toString()}
              className="drop-file-preview__item"
              style={item?.flag ? { backgroundColor: "rgb(0,128,0,0.7)	" } : {}}
            >
              <img
                style={{ width: "5%" }}
                src={
                  ImageConfig[item.file.type.split("/")[1]] ||
                  ImageConfig["rar"]
                }
                alt="Error Input"
              />
              {console.log("first", item.file.type.split("/")[1])}

              <div className="drop-file-preview__item__info">
                <Button onClick={handledownload} variant="outlined">
                  {"ตรวจสอบไฟล์ : "}
                  {item.file.name}
                </Button>
                <p style={{ marginTop: "8px" }}>
                  {" "}
                  {"เวลาแก้ไขไฟล์ล่าสุด : "}
                  {item.file.lastModifiedDate.toString().substring(0, 25)}
                </p>
              </div>

              {!item.flag && (
                <span className="drop-file-preview__item__del">
                  <HighlightOffIcon onClick={() => fileRemove(item)} />
                </span>
              )}
            </div>
          ))}

          {console.log(
            "------",
            fileList.filter((item) => !item.flag)
          )}
          <Box
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              minWidth="100%"
              variant="contained"
              component="label"
              disabled={fileList.filter((item) => !item.flag).length === 0}
              onClick={onClickUpload}
            >
              อัปโหลดไฟล์
            </Button>
          </Box>
        </div>
      ) : null}
    </div>
  );
};

DropFileInputHTML.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInputHTML;
