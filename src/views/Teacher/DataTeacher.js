import UpdateIcon from "@mui/icons-material/Update";

import GradingIcon from "@mui/icons-material/Grading";

const MenuitemTeacher = [
  {
    title: "ตรวจสอบการเรียนนิสิต",
    icon: GradingIcon,
    href: "/teacher",
  },

  {
    title: "Upload หลักสูตร",
    icon: UpdateIcon,
    href: "/teacher/updatecourse",
  },

  {
    title: "Upload วิชาศึกษาทั่วไป",
    icon: UpdateIcon,
    href: "/teacher/updategensub",
  },

  {
    title: "Upload ผลการเรียน",
    icon: UpdateIcon,
    href: "/teacher/updatehtml",
  },
];

export default MenuitemTeacher;
