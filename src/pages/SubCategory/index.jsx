import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../../apis/api";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";

const SubCategory = () => {
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI("/subcategory").then((data) =>
      setSubCategoryData(data.subCategory),
    );
    fetchDataFromAPI("/category").then((data) => setCategoryData(data));
  }, []);

  const handleChange = (event, value) => {
    fetchDataFromAPI(`/category?page=${value}`).then((data) =>
      setCategoryData(data),
    );
  };

  const handleClick = (event, chipKey) => {
    console.log(`Chip with key ${chipKey} was clicked`);
  };

  const handleDelete = (event, chipId) => {
    console.log(`Chip with id ${chipId} was deleted`);
  };

  return (
    <>
      <div className="right-content w-100 page-transition">
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Sub Category List</h5>
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
            <a href="/subcategory/add">
              <Button className="btn-blue  ms-3 ps-3 pe-3">
                Add Sub Category
              </Button>
            </a>
          </div>
        </div>
        <div className="card shadow border-0 w-100 mt-4">
          <div className="card-body">
            <table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="col1">
                    CATEGORY IMAGE
                  </th>
                  <th scope="col">CATEGORY</th>
                  <th scope="col">SUB CATEGORY</th>
                </tr>
              </thead>
              <tbody>
                {categoryData?.categoryList &&
                  categoryData.categoryList.length !== 0 &&
                  categoryData.categoryList.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div
                            className="d-flex align-items-center"
                            style={{ width: "150px" }}
                          >
                            <div className="imgWrapper">
                              {item.images.map((it) => {
                                return (
                                  <div key={it} className="img card shadow m-0">
                                    <img
                                      src={it}
                                      alt="Category list"
                                      className="w-100"
                                    />
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>
                          <div className="d-flex jsl">
                            {subCategoryData &&
                              subCategoryData.length !== 0 &&
                              subCategoryData
                                .filter(
                                  (itemSub) => itemSub.category === item.id,
                                )
                                .map((sub) => {
                                  return (
                                    <ListItem key={sub.key} className="p-1">
                                      <Chip
                                        key={sub.id}
                                        className="me-1"
                                        label={sub.name}
                                        onClick={(event) =>
                                          handleClick(event, sub.key)
                                        }
                                        onDelete={(event) =>
                                          handleDelete(event, sub.id)
                                        }
                                      />
                                    </ListItem>
                                  );
                                })}
                          </div>
                        </td>
                      </tr>
                    );
                  })}{" "}
              </tbody>
            </table>
          </div>
          <div className="d-flex tableFooter me-4">
            <Pagination
              count={categoryData?.totalPages}
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

export default SubCategory;
