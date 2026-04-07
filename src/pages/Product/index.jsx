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
import Pagination from "@mui/material/Pagination";
import PageHeader from "../../components/PageHeader";
import toast from "react-hot-toast";

const formatVND = (n) =>
  n?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const Products = () => {
  const [productData, setproductData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [page, setPage] = useState(1);

  const deleteProduct = (id) => {
    if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;
    deleteData(`/product/delete/${id}`)
      .then((res) => {
        toast.success("Xoá sản phẩm thành công!");
        setproductData((prev) => ({
          ...prev,
          productList: prev.productList?.filter((product) => product.id !== id),
          totalDocs: (prev.totalDocs || 1) - 1,
        }));
      })
      .catch((error) => {
        toast.error("Xoá sản phẩm thất bại. Vui lòng thử lại.");
      });
  };

  const handleChange = (event, value) => {
    setPage(value);
    fetchDataFromAPI(`/product?page=${value}`).then((data) =>
      setproductData(data),
    );
  };

  useEffect(() => {
    fetchDataFromAPI("/product").then((data) => {
      console.log(data);
      setproductData(data);
    });
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
      <PageHeader
        title="Product List"
        breadcrumbs={[{ label: "Product" }]}
        addButtonText="Add Product"
        addButtonLink="/product/add"
      />
      <div className="row dashboardBoxWrapperRow dashboardBoxWrapperRowV2 pt-0">
        <div className="col-sm-12">
          <div className="dashboardBoxWrapper d-flex">
            <DashboardBox
              color={["#1da256", "#48d483"]}
              icon={<FaUserCircle />}
              grow={true}
              title="Tổng sản phẩm"
              value={productData.totalDocs || 0}
            />
            <DashboardBox
              color={["#c012e1", "#eb64fe"]}
              icon={<IoMdCart />}
              title="Tổng đơn hàng"
              value="0"
            />
            <DashboardBox
              color={["#2c78e5", "#60aff5"]}
              icon={<MdShoppingBag />}
              title="Tổng doanh thu"
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
                <th scope="col" style={{ width: "80px" }}>
                  ẢNH
                </th>
                <th scope="col">TÊN SẢN PHẨM</th>
                <th scope="col">DANH MỤC</th>
                <th scope="col">THƯƠNG HIỆU</th>
                <th scope="col">GIÁ</th>
                <th scope="col" style={{ width: "80px" }}>
                  KHO
                </th>
                <th scope="col" style={{ width: "120px" }}>
                  ĐÁNH GIÁ
                </th>
                <th scope="col" style={{ width: "140px" }}>
                  HÀNH ĐỘNG
                </th>
              </tr>
            </thead>
            <tbody>
              {productData.productList &&
                productData.productList.length !== 0 &&
                productData.productList.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <div className="imgWrapper">
                          <div className="img card shadow m-0">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-100"
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ maxWidth: "250px" }}>
                          <a href={`/product/details/${item.id}`}>
                            <h6
                              className="mb-0"
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {item.name}
                            </h6>
                          </a>
                          <span className="text-muted" style={{ fontSize: 12 }}>
                            {
                              subcategories?.find(
                                (s) => s.id === item.subcategory,
                              )?.name
                            }
                          </span>
                        </div>
                      </td>
                      <td>
                        {categories?.find((c) => c.id === item.category)
                          ?.name || "—"}
                      </td>
                      <td>
                        {brands?.find((b) => b.id === item.brand)?.name || "—"}
                      </td>
                      <td>
                        <div>
                          <del
                            className="old"
                            style={{ fontSize: 13, color: "#999" }}
                          >
                            {formatVND(item.oldPrice)}
                          </del>
                          <span className="new text-danger d-block fw-bold">
                            {formatVND(item.price)}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span
                          className={`badge ${item.countInStock > 0 ? "bg-success" : "bg-danger"}`}
                          style={{ fontSize: 13 }}
                        >
                          {item.countInStock}
                        </span>
                      </td>
                      <td>
                        <Rating
                          name={`rating-${item.id}`}
                          defaultValue={item.rating}
                          precision={0.5}
                          size="small"
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
        <div className="d-flex tableFooter me-4">
          <Pagination
            count={productData?.totalPages || 1}
            page={page}
            color="primary"
            className="pagination"
            showFirstButton
            showLastButton
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};
export default Products;
