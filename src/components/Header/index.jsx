import Button from "@mui/material/Button";
import Logo from "../../assets/images/logo.webp";
import { RiMenuUnfold4Line } from "react-icons/ri";
import { RiMenuLine } from "react-icons/ri";
import { useContext } from "react";
import { MyContext } from "../../context/MyContext";
import { FaMoon } from "react-icons/fa6";
import { MdOutlineLightMode } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  const context = useContext(MyContext);

  const toggleMenu = () => {
    context.setIsMenuOpen(!context.isMenuOpen);
    context.setIsToggleSibar(!context.isToggleSibar);
  };
  const toggleTheme = () => {
    if (context.theme === "light") {
      context.setTheme("dark");
    } else {
      context.setTheme("light");
    }
  };

  const handleOpenMyAcc = () => {};
  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center w-100">
            <div className="col-sm-2 part1 pe-0">
              <a href="/" className=" d-flex align-items-center logo">
                <img src={Logo} alt="Logo" />
                <span className="ms-2">ECOMMERCE</span>
              </a>
            </div>
            <div className="col-sm-3 part2 d-flex align-items-center">
              <Button className="rounded-circle mr-3 p-0" onClick={toggleMenu}>
                {context.isMenuOpen ? <RiMenuLine /> : <RiMenuUnfold4Line />}
              </Button>
            </div>
            <div className="col-sm-7 part3 d-flex align-items-center justify-content-end">
              <Button className="rounded-circle me-3" onClick={toggleTheme}>
                {context.theme === "light" ? (
                  <FaMoon />
                ) : (
                  <MdOutlineLightMode />
                )}
              </Button>
              <div className="dropdownWrapper position-relative">
                <Button className="rounded-circle me-3">
                  <IoIosNotifications />
                </Button>
              </div>
              <div className="myAccWrapper">
                <Button
                  className="myAcc d-flex align-items-center"
                  onClick={handleOpenMyAcc}
                >
                  <div className="userImg">
                    <span className="rounded-circle">
                      {context.user?.name?.charAt(0) || ""}
                    </span>
                  </div>
                  <div className="userInfo res-hide">
                    <h4>{context.user?.name || ""}</h4>
                    <p className="mb-0">{context.user?.email}</p>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
