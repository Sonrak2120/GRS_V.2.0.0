import UpdateIcon from "@mui/icons-material/Update";

import GradingIcon from "@mui/icons-material/Grading";

const MenuitemTeacher = [
  {
    title: "ตรวจสอบการเรียนนิสิต",
    icon: GradingIcon,
    href: "/teacher",
  },
  // {
  //   title: "ตรวจสอบจบ",
  //   icon: DomainVerificationIcon,
  //   href: "/teacher/checkactive",
  // },
  {
    title: "Upload ผลการเรียน",
    icon: UpdateIcon,
    href: "/teacher/updatehtml",
  },

  // {
  //   title: "ทดสอบนะจ๊ะ",
  //   icon: AlbumOutlined,
  //   href: "/teacher/Test",
  // },
];

export default MenuitemTeacher;
