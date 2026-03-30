import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import Sidebar from "./components/SideBar";
import LoadingBar from "./components/LoadingBar";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Category";
import CategoryEdit from "./pages/Category/CategoryEdit";
import CategoryAdd from "./pages/Category/CategoryAdd";
import Products from "./pages/Product";
import ProductAdd from "./pages/Product/ProductAdd";
import ProductEdit from "./pages/Product/ProductEdit";
import ProductDetails from "./pages/Product/ProductDetails";
import SubCategory from "./pages/SubCategory";
import SubCategoryAdd from "./pages/SubCategory/SubCategoryAdd";
import Brand from "./pages/Brand";
import BrandAdd from "./pages/Brand/BrandAdd";
import Banner from "./pages/Banner";
import BannerAdd from "./pages/Banner/BannerAdd";
import { useToast } from "./utils/Toast";
import axiosInstance, {
  setAxiosAuthToken,
  injectLogoutHandler,
} from "./apis/axiosConfig";
import { MyContext } from "./context/MyContext";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpenHeaderFooterShow, setisOpenHeaderFooterShow] = useState(false);
  const [isToggleSibar, setIsToggleSibar] = useState(true);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null);
  const [theme, setTheme] = useState("light");
  const [isOpenLogin, setIsOpenLogin] = useState(true);
  const [isInitializing, setIsInitializing] = useState(true); // New: Prevents flicker
  const navigate = useNavigate();

  const setAccessToken = (token) => {
    setAccessTokenState(token);
    setAxiosAuthToken(token);
  };

  const handleLogout = useCallback(() => {
    setUser(null);
    setAccessToken(null);
    setIsOpenLogin(true);
    // Hard redirect to clear any lingering memory/states
    navigate("/login");
  }, []);

  const values = {
    isOpenHeaderFooterShow,
    setisOpenHeaderFooterShow,
    isMenuOpen,
    setIsMenuOpen,
    theme,
    setTheme,
    isToggleSibar,
    setIsToggleSibar,
    user,
    setUser,
    isOpenLogin,
    setIsOpenLogin,
    accessToken,
    setAccessToken,
  };

  useEffect(() => {
    const root = window.document.body;
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    if (accessToken) {
      setIsOpenLogin(false);
      setisOpenHeaderFooterShow(true);
      setIsToggleSibar(true);
    } else {
      setIsOpenLogin(true);
      setisOpenHeaderFooterShow(false);
      setIsToggleSibar(false);
    }
  }, [theme, accessToken]);

  useEffect(() => {
    injectLogoutHandler(handleLogout);

    const initApp = async () => {
      try {
        // Attempt to get a new access token via httpOnly cookie
        const { data } = await axiosInstance.get("/user/refresh-token", {
          withCredentials: true,
        });
        console.log(data);
        if (data?.accessToken) {
          setAccessToken(data.accessToken);
          // Fetch user profile immediately after getting token
          const profileRes = await axiosInstance.get("/user/profile");
          if (profileRes.data.success) setUser(profileRes.data.user);
        }
      } catch (err) {
        console.warn("Session expired.");
        setAccessToken(null);
      } finally {
        setIsInitializing(false);
      }
    };

    initApp();
  }, [handleLogout]);

  if (isInitializing) return <LoadingBar />;
  return (
    <MyContext.Provider value={values}>
      <div className="main d-flex">
        {isOpenHeaderFooterShow === true && <Header />}
        {isOpenHeaderFooterShow === true && (
          <div
            className={`sidebarWrapper ${isToggleSibar === true ? "" : "toggle"}`}
          >
            <Sidebar />
          </div>
        )}
        <div
          className={`content ${isToggleSibar === true ? "" : "toggle"} ${isOpenLogin === true ? "full" : ""}`}
        >
          <Routes>
            <Route path="/login" exact={true} element={<SignIn />} />
            {accessToken ? (
              <>
                <Route path="/" exact={true} element={<Dashboard />} />
                <Route path="/category" exact={true} element={<Categories />} />
                <Route
                  path="/category/add"
                  exact={true}
                  element={<CategoryAdd />}
                />
                <Route
                  path="/category/edit/:id"
                  exact={true}
                  element={<CategoryEdit />}
                />
                <Route path="/product" exact={true} element={<Products />} />
                <Route
                  path="/product/add"
                  exact={true}
                  element={<ProductAdd />}
                />
                <Route
                  path="/product/edit/:id"
                  exact={true}
                  element={<ProductEdit />}
                />
                <Route
                  path="/product/details/:id"
                  exact={true}
                  element={<ProductDetails />}
                />
                <Route
                  path="/subcategory"
                  exact={true}
                  element={<SubCategory />}
                />
                <Route
                  path="/subcategory/add"
                  exact={true}
                  element={<SubCategoryAdd />}
                />
                <Route path="/brand" exact={true} element={<Brand />} />
                <Route path="/brand/add" exact={true} element={<BrandAdd />} />
                <Route path="/banners" exact={true} element={<Banner />} />
                <Route
                  path="/banner/add"
                  exact={true}
                  element={<BannerAdd />}
                />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
          </Routes>
        </div>
      </div>
    </MyContext.Provider>
  );
}

export default App;
