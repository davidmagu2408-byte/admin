import { GiStarsStack } from "react-icons/gi";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { fetchDataFromAPI, deleteData } from "../../apis/api";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaRegTrashAlt, FaUserCircle } from "react-icons/fa";
import DashboardBox from "../../components/DashboardBox";
import { IoMdCart } from "react-icons/io";
import { MdShoppingBag } from "react-icons/md";
import Rating from "@mui/material/Rating";
import { IoEyeSharp } from "react-icons/io5";

const Dashboard = () => {
  const [productData, setproductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const deleteProduct = (id) => {
    deleteData(`/product/delete/${id}`)
      .then((res) => {
        alert("Product Deleted Successfully");
        setproductData(productData.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.error("Delete failed:", error);
        alert("Failed to delete category. Please try again.");
      });
  };
  useEffect(() => {
    fetchDataFromAPI("/product").then((data) => setproductData(data));
    fetchDataFromAPI("/category")
      .then((data) => {
        setCategories(data.category);
      })
      .catch(() => setCategories([]));
    fetchDataFromAPI("/subcategory")
      .then((data) => {
        setSubcategories(data.subCategory);
      })
      .catch(() => setSubcategories([]));
    fetchDataFromAPI("/brand")
      .then((data) => {
        setBrands(data.brandList);
      })
      .catch(() => setBrands([]));
  }, []);

  return (
    <div className="right-content w-100 page-transition">
      <div className="row dashboardBoxWrapperRow dashboard_Box dashboardBoxWrapperRowV2">
        <div className="col-sm-12">
          <div className="dashboardBoxWrapper d-flex">
            <DashboardBox
              color={["#1da256", "#48d483"]}
              icon={<FaUserCircle />}
              grow={true}
              title="Total Products"
              value={productData.product && productData.product.length}
            />
            <DashboardBox
              color={["#c012e1", "#eb64fe"]}
              icon={<IoMdCart />}
              title="Total Orders"
              value="0"
            />
            <DashboardBox
              color={["#2c78e5", "#60aff5"]}
              icon={<MdShoppingBag />}
              title="Total Sales"
              value="0"
            />
            <DashboardBox
              color={["#e1950e", "#f3cd29"]}
              icon={<GiStarsStack />}
              title="Total Reviews"
              value="0"
            />
          </div>
        </div>
      </div>
      <div className="card shadow border-0 w-100 mt-4">
        <div className="card-body">
          <table className="table table-bordered table-striped v-align">
            <thead className="thead-dark">
              <tr>
                <th scope="col">PRODUCT</th>
                <th scope="col">CATEGORY</th>
                <th scope="col">SUBCATEGORY</th>
                <th scope="col">BRAND</th>
                <th scope="col">PRICE</th>
                <th scope="col">RATING</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {productData.product &&
                productData.product.length !== 0 &&
                productData.product.map((item) => {
                  console.log(item);

                  return (
                    <tr key={item.id}>
                      <td>
                        <div
                          className="d-flex align-items-center "
                          style={{ width: "150px" }}
                        >
                          <div className="imgWrapper ">
                            <div className="img card shadow m-0">
                              <img
                                src={item.images[0]}
                                alt="ProductImage"
                                className="w-100"
                              />
                            </div>
                          </div>
                          <div className="info ps-3">
                            <a href={`/product/details/${item.id}`}>
                              <h6>{item.name}</h6>
                            </a>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        {categories &&
                          categories.length !== 0 &&
                          categories
                            .filter((category) => category.id === item.category)
                            .map((category) => {
                              return category.name;
                            })}
                      </td>
                      <td>
                        {subcategories &&
                          subcategories.length !== 0 &&
                          subcategories
                            .filter(
                              (subcategory) =>
                                subcategory.id === item.subcategory,
                            )
                            .map((subcategory) => {
                              return subcategory.name;
                            })}
                      </td>
                      <td>
                        {brands &&
                          brands.length !== 0 &&
                          brands
                            .filter((brand) => brand.id === item.brand)
                            .map((brand) => {
                              return brand.name;
                            })}
                      </td>
                      <td>
                        <div className="">
                          <del className="old">{item.oldPrice}</del>
                          <span className="new text-danger d-block w-100">
                            {item.price}
                          </span>
                        </div>
                      </td>
                      <td>
                        <Rating
                          name="half-rating-read"
                          defaultValue={item.rating}
                          precision={0.5}
                          className="pt-2"
                          readOnly
                        />
                      </td>
                      <td>
                        <div className="actions d-flex align-items-center">
                          <a href={`/product/details/${item.id}`}>
                            <Button className="secondary">
                              <IoEyeSharp />
                            </Button>
                          </a>
                          <a href={`/product/edit/${item.id}`}>
                            <Button className="success">
                              <BiSolidEditAlt />
                            </Button>
                          </a>
                          <Button
                            className="error"
                            onClick={() => deleteProduct(item.id)}
                          >
                            <FaRegTrashAlt />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
