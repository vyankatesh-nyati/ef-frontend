import Image from "next/image";
import classes from "./Navbar.module.scss";
import logo from "../../public/logo.png";
import Link from "next/link";
import Button from "./Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { ConfigProvider, Menu, MenuProps } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaHome } from "react-icons/fa";
import { PiCertificateFill, PiGooglePhotosLogoBold } from "react-icons/pi";
import { BsFillCircleFill } from "react-icons/bs";
import { AiFillInfoCircle, AiOutlineClose } from "react-icons/ai";
// import { BiSolidLogInCircle } from "react-icons/bi";
import { CourseData } from "@/data/course_data";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const iconsStyle = { fontSize: 20 };
const dotIconStyle = { fontSize: 8 };

const items: MenuProps["items"] = [
  getItem("Home", "1", <FaHome style={iconsStyle} />),
  getItem(
    "Our Training",
    "ourTraing",
    <PiCertificateFill style={iconsStyle} />,
    CourseData.map((course, index) => {
      return getItem(
        course.title,
        index + 2,
        <BsFillCircleFill style={dotIconStyle} />
      );
    })
    /* 
    [
      getItem("Skill Booster", "2", <BsFillCircleFill style={dotIconStyle} />),
      getItem(
        "Online estimation and costing",
        "3",
        <BsFillCircleFill style={dotIconStyle} />
      ),
      getItem("Archi - norm", "4", <BsFillCircleFill style={dotIconStyle} />),
    ]
    */
  ),
  getItem("About Us", "aboutUs", <AiFillInfoCircle style={iconsStyle} />, [
    getItem(
      "Excellence Foundation",
      "6",
      <BsFillCircleFill style={dotIconStyle} />
    ),
    getItem("Mentor", "7", <BsFillCircleFill style={dotIconStyle} />),
  ]),
  getItem("Gallery", "8", <PiGooglePhotosLogoBold style={iconsStyle} />),
  // getItem("Login", "8", <BiSolidLogInCircle style={iconsStyle} />),
  getItem(
    <button
      style={{
        borderRadius: "0.5rem",
        border: "none",
        padding: "0.3rem 1.5rem",
        width: "100%",
      }}
      onClick={(): void => {}}
    >
      Register
    </button>,
    "9"
  ),
];

export default function Navbar(): JSX.Element {
  const router = useRouter();
  const [flexClassOur, setFlexClassOur] = useState("none");
  const [flexClassAbout, setFlexClassAbout] = useState("none");
  const [isHamburgerMenu, setIsHamburgerMenu] = useState<boolean>(false);

  function onClickRegisterHandler(): void {
    router.push("/register");
  }

  function onMouseHoverEvent(value: number): void {
    if (value == 1) {
      setFlexClassOur("flex");
    } else {
      setFlexClassAbout("flex");
    }
  }

  function onMouseOutEvent(value: number): void {
    if (value == 1) {
      setFlexClassOur("none");
    } else {
      setFlexClassAbout("none");
    }
  }

  function onClickHamburgerButtonHandler(): void {
    setIsHamburgerMenu(!isHamburgerMenu);
  }

  const onClickHamburger: MenuProps["onClick"] = (e) => {
    onClickHamburgerButtonHandler();
    switch (e.key) {
      case "1":
        router.push("/");
        break;
      case "2":
        router.push(
          "/course/construction-skill-development-internship-training"
        );
        break;
      case "3":
        router.push("/course/skill-booster-internship-training-program");
        break;
      case "4":
        router.push("/course/professional-billing-course");
        break;
      case "5":
        router.push("/course/professional-estimation-and-costing-training");
        break;
      case "6":
        router.push("/about/excellence-foundation");
        break;
      case "7":
        router.push("/about/mentor");
        break;
      case "8":
        router.push("/gallery");
        break;
      case "9":
        onClickRegisterHandler();
        break;
      default:
        break;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.subContainer1}>
        <nav className={classes.nav}>
          <div className={classes.logo}>
            <Image src={logo} alt="Excellence foundation logo" />
          </div>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li
              onMouseOver={() => {
                onMouseHoverEvent(1);
              }}
              onMouseLeave={() => {
                onMouseOutEvent(1);
              }}
            >
              Our Training
              <ul
                style={{
                  display: flexClassOur,
                }}
              >
                {CourseData.map((course) => (
                  <li key={course.id}>
                    <Link href={course.path}>{course.title}</Link>
                  </li>
                ))}
              </ul>
            </li>
            <li
              onMouseOver={() => {
                onMouseHoverEvent(2);
              }}
              onMouseLeave={() => {
                onMouseOutEvent(2);
              }}
            >
              About Us
              <ul
                style={{
                  display: flexClassAbout,
                }}
              >
                <li>
                  <Link href="/about/excellence_foundation">
                    Excellence Foundation
                  </Link>
                </li>
                <li>
                  <Link href="/about/mentor">Mentor</Link>
                </li>
              </ul>
            </li>
            {/* <li>
              <Link href="/home">Login</Link>
            </li> */}
            <li>
              <Link href="/gallery">Gallery</Link>
            </li>
            <li>
              <Button
                text="Register"
                padding="6px 26px"
                fontSize={1}
                onClick={onClickRegisterHandler}
              />
            </li>
          </ul>
        </nav>
      </div>
      <div className={classes.subContainer2}>
        <div className={classes.appBar}>
          {isHamburgerMenu ? (
            <AiOutlineClose
              className={classes.hamburgerIcon}
              onClick={onClickHamburgerButtonHandler}
            />
          ) : (
            <RxHamburgerMenu
              className={classes.hamburgerIcon}
              onClick={onClickHamburgerButtonHandler}
            />
          )}
          <Image src={logo} alt="Excellence foundation logo" />
          <div></div>
        </div>
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                darkSubMenuItemBg: "transperent",
                darkItemSelectedBg: "transperent",
                itemMarginInline: 0,
              },
            },
          }}
        >
          <Menu
            onClick={onClickHamburger}
            mode="inline"
            items={items}
            className={classes.menu}
            theme="dark"
            style={{
              width: isHamburgerMenu
                ? window.innerWidth < 300
                  ? window.innerWidth
                  : 300
                : 0,
              // padding: "0rem"
            }}
          />
        </ConfigProvider>
      </div>
    </div>
  );
}
