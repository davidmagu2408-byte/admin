import { useContext, useEffect, useState } from "react";
import { MyContext } from "../../context/MyContext";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from "@mui/material/Button";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { postData } from "../../apis/api";
import Logo from "../../assets/images/logo.webp";
import Background from "../../assets/images/background.jpg";
import Toast, { useToast } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const context = useContext(MyContext);
  const navigate = useNavigate();
  const [isOpenShowPassword, setIsOpenShowPassword] = useState(false);
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formfield, setformfield] = useState({
    email: "",
    password: "",
  });
  const [inputIndex, setInputIndex] = useState(null);

  const handleChangeShowPassword = () => {
    if (isOpenShowPassword === true) {
      setIsOpenShowPassword(false);
    } else {
      setIsOpenShowPassword(true);
    }
  };

  const changeInput = (e) => {
    setformfield({
      ...formfield,
      [e.target.name]: e.target.value,
    });
  };

  const focuseInput = (index) => {
    setInputIndex(index);
  };

  const setAccessTokenHandler = (token) => {
    context.setAccessToken(token);
  };

  const signIn = async (e) => {
    e.preventDefault();
    if (!formfield.email.trim() || !formfield.password.trim()) {
      showToast("Please enter email and password", "error");
    } else {
      setIsLoading(true);
      try {
        const data = await postData("/user/login", formfield);
        if (data.user.isAdmin === true) {
          setAccessTokenHandler(data.accessToken);
          context.setUser(data.user);
          setTimeout(() => {
            showToast(data.message, "success");
          }, 1000);
          navigate("/");
          context.setisOpenHeaderFooterShow(true);
          context.setIsToggleSibar(true);
        } else {
          showToast("Tài khoản không có quyền Admin", "error");
        }
      } catch (error) {
        showToast(error.response?.data?.message || "Login failed", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Toast />
      <img src={Background} className="loginPatern" alt="background" />
      <section className="loginSection page-transition">
        <div className="loginBox">
          <a className="d-flex align-items-center flex-column logo" href="/">
            <img src={Logo} alt="Logo" />
            <span className="ml-2">ECOMMERCE</span>
          </a>
          <div className="wrapper mt-3 card border">
            <form onSubmit={signIn}>
              <div
                className={`form-group position-relative ${inputIndex === 0 ? "focus" : ""}`}
              >
                <span className="icon">
                  <MdEmail />
                </span>
                <span className="input">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter your email"
                    name="email"
                    onFocus={() => focuseInput(0)}
                    onBlur={() => setInputIndex(null)}
                    onChange={changeInput}
                  />
                </span>
              </div>
              <div
                className={`form-group position-relative ${inputIndex === 1 ? "focus" : ""}`}
              >
                <span className="icon">
                  <RiLockPasswordFill />
                </span>
                <span className="input">
                  <input
                    type={isOpenShowPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="enter your password"
                    name="password"
                    onFocus={() => focuseInput(1)}
                    onBlur={() => setInputIndex(null)}
                    onChange={changeInput}
                  />
                </span>
                <span className="toggleShowPassword">
                  {isOpenShowPassword ? (
                    <FaEyeSlash onClick={handleChangeShowPassword} />
                  ) : (
                    <FaEye onClick={handleChangeShowPassword} />
                  )}
                </span>
              </div>
              <div className="form-group">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="btn-blue btn-lg w-100 btn-big"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;
