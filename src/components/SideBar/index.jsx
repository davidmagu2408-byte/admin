import Button from "@mui/material/Button";
import { MdDashboard } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa6";
import { FaProductHunt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { IoMdImages } from "react-icons/io";
import { logout } from "../../apis/api";
import { MyContext } from "../../context/MyContext";
import { useContext } from "react";
import axiosInstance from "../../apis/axiosConfig";

const Sidebar = () => {
  const [active, setActive] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  const context = useContext(MyContext);

  const isOpenSubMenu = (index) => {
    if (active === index) {
      setIsToggleSubmenu(!isToggleSubmenu);
    } else {
      setActive(index);
      setIsToggleSubmenu(true);
    }
  };

  const handleLogOut = async () => {
    try {
      const res = await axiosInstance.post("/user/logout");
      if (res.data.success === true) {
        context.setUser(null);
        context.setAccessToken(null);
        context.setisOpenHeaderFooterShow(false);
        context.setIsToggleSibar(false);
        context.setIsOpenLogin(true);
        window.location.href = "/login";
      }
    } catch (error) {
      // logout failed silently
    }
  };
  return (
    <>
      <div className="sidebar page-transition">
        <ul>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${active === 0 ? "active" : ""}`}
                onClick={() => isOpenSubMenu(0)}
              >
                <span className="icon">
                  <MdDashboard />
                </span>
                Dashboard
              </Button>
            </Link>
          </li>
          <li>
            <Button
              className={`w-100 ${active === 1 && isToggleSubmenu === true ? "active" : ""}`}
              onClick={() => isOpenSubMenu(1)}
            >
              <span className="icon">
                <IoMdImages />
              </span>
              Home Banner Slides
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${active === 1 && isToggleSubmenu === true ? "collapse" : "collapsed"}`}
            >
              <ul className="submenu">
                <li style={{ animationDelay: "0.05s" }}>
                  <Link to="/banners">All Banners</Link>
                </li>
                <li style={{ animationDelay: "0.1s" }}>
                  <Link to="/banner/add">Add Home Banner Slide</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Button
              className={`w-100 ${active === 2 && isToggleSubmenu === true ? "active" : ""}`}
              onClick={() => isOpenSubMenu(2)}
            >
              <span className="icon">
                <BiSolidCategory />
              </span>
              Category
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${active === 2 && isToggleSubmenu === true ? "collapse" : "collapsed"}`}
            >
              <ul className="submenu">
                <li style={{ animationDelay: "0.05s" }}>
                  <Link to="/category">All Categories</Link>
                </li>
                <li style={{ animationDelay: "0.1s" }}>
                  <Link to="/category/add">Add Category</Link>
                </li>
                <li style={{ animationDelay: "0.15s" }}>
                  <Link to="/subcategory">Sub Category List</Link>
                </li>
                <li style={{ animationDelay: "0.2s" }}>
                  <Link to="/subcategory/add">Add Sub Category</Link>
                </li>
                <li style={{ animationDelay: "0.25s" }}>
                  <Link to="/brand">Brand List</Link>
                </li>
                <li style={{ animationDelay: "0.3s" }}>
                  <Link to="/brand/add">Add Brand</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Button
              className={`w-100 ${active === 3 && isToggleSubmenu === true ? "active" : ""}`}
              onClick={() => isOpenSubMenu(3)}
            >
              <span className="icon">
                <FaProductHunt />
              </span>
              Products
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${active === 3 && isToggleSubmenu === true ? "collapse" : "collapsed"}`}
            >
              <ul className="submenu">
                <li style={{ animationDelay: "0.05s" }}>
                  <Link to="/product">All Products</Link>
                </li>
                <li style={{ animationDelay: "0.1s" }}>
                  <Link to="/product/add">Add Product</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${active === 4 && isToggleSubmenu === true ? "active" : ""}`}
                onClick={() => isOpenSubMenu(4)}
              >
                <span className="icon">
                  <FaCartArrowDown />
                </span>
                Orders
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <div className="logoutWrapper d-flex align-items-center ">
              <Button
                className="d-flex justify-content-center w-100 logoutBox"
                onClick={handleLogOut}
              >
                Logout
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
