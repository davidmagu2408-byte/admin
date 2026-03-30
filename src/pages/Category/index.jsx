import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { BiSolidEditAlt } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData, fetchDataFromAPI } from "../../apis/api";
import Pagination from "@mui/material/Pagination";

const Categories = () => {
  const [categorieData, setCategoriesData] = useState([]);

  const deleteCategory = (id) => {
    deleteData(`/category/delete/${id}`)
      .then((res) => {
        alert("Category Deleted Successfully");
        setCategoriesData((prev) => ({
          ...prev,
          categoryList: prev.categoryList.filter((c) => c.id !== id),
        }));
      })
      .catch((error) => {
        console.error("Delete failed:", error);
        alert("Failed to delete category. Please try again.");
      });
  };

  const handleChange = (event, value) => {
    fetchDataFromAPI(`/category?page=${value}`).then((data) =>
      setCategoriesData(data),
    );
  };

  useEffect(() => {
    fetchDataFromAPI("/category").then((data) => setCategoriesData(data));
  }, []);

  return (
    <>
      <div className="right-content w-100 page-transition">
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Category List</h5>
          <div className="ms-auto d-flex align-items-center">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                component="a"
                href="#"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb component="a" href="#" label="Category" />
            </Breadcrumbs>
            <a href="/category/add">
              <Button className="btn-blue  ms-3 ps-3 pe-3">Add Category</Button>
            </a>
          </div>
        </div>
        <div className="card shadow border-0 w-100 mt-4">
          <div className="card-body">
            <table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">IMAGE</th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">COLOR</th>
                  <th scope="col">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {categorieData?.categoryList &&
                  categorieData.categoryList.length !== 0 &&
                  categorieData.categoryList.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div
                            className="d-flex align-items-center "
                            style={{ width: "150px" }}
                          >
                            {item.images.map((it) => {
                              return (
                                <div key={it} className="imgWrapper">
                                  <div className="img card shadow m-0">
                                    <img
                                      src={it}
                                      alt="Category list"
                                      className="w-100"
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.color}</td>
                        <td>
                          <div className="actions d-flex align-items-center">
                            <a href={`/category/edit/${item.id}`}>
                              <Button className="success">
                                <BiSolidEditAlt />
                              </Button>
                            </a>
                            <Button
                              className="error"
                              onClick={() => deleteCategory(item.id)}
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
              count={categorieData?.totalPages}
              color="primary"
              className="pagination"
              showFirstButton
              showLastButton
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Categories;
