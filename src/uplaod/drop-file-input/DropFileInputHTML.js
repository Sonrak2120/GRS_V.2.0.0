import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Progess from "../../layouts/FullLayout/Sidebar/Progess";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
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
  const [year, setYear] = useState(1);
  const [section, setSection] = React.useState(0);
  const token = sessionStorage.getItem("token");

  const onClickUpload = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file.file);
      formData.append("year", year);
      formData.append("section", section);
      const Updatecourse = await axios({
        method: "post",
        url: "http://34.126.149.156:5000/upload-zip",
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
      <div style={{ display: "flex" }}>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            ชั้นปี
          </InputLabel>
          <NativeSelect
            defaultValue={1}
            inputProps={{
              name: "year",
              id: "uncontrolled-native",
            }}
            onChange={async (e) => {
              setYear(e.target.value);
            }}
          >
            <option value={1}>ปี1</option>
            <option value={2}>ปี2</option>
            <option value={3}>ปี3</option>
            <option value={4}>ปี4</option>
            <option value={5}>ปี5</option>
            <option value={6}>ปี6</option>
            <option value={7}>ปี7</option>
            <option value={8}>ปี8</option>
          </NativeSelect>
        </FormControl>
        <div style={{ width: "3rem" }}></div>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            ภาค
          </InputLabel>
          <NativeSelect
            defaultValue={0}
            inputProps={{
              name: "section",
              id: "uncontrolled-native",
            }}
            onChange={async (e) => {
              setSection(e.target.value);
            }}
          >
            <option value={0}>ปกติ</option>
            <option value={1}>พิเศษ</option>
          </NativeSelect>
        </FormControl>
      </div>
      <Progess load={loading} />
      <div style={{ marginTop: "5rem" }}></div>
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
