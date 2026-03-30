import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { fetchDataFromAPI } from "../../apis/api";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";

const Brand = () => {
  const [brandData, setBrandData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchDataFromAPI("/category").then((data) => setCategoryData(data));
    fetchDataFromAPI("/subcategory").then((data) => setSubCategoryData(data));
    fetchDataFromAPI("/brand").then((brand) => setBrandData(brand));
  }, []);

  const handleChange = (event, value) => {
    fetchDataFromAPI(`/subcategory?page=${value}`).then((data) =>
      setSubCategoryData(data),
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
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Brand List</h5>
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
              <StyledBreadcrumb component="a" href="#" label="Brand" />
            </Breadcrumbs>
            <a href="/brand/add">
              <Button className="btn-blue  ms-3 ps-3 pe-3">Add Brand</Button>
            </a>
          </div>
        </div>
        <div className="card shadow border-0 w-100 mt-4">
          <div className="card-body">
            <table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" className="col1">
                    CATEGORY/SUBCATEGORY
                  </th>
                  <th scope="col">BRAND</th>
                </tr>
              </thead>
              <tbody>
                {subCategoryData?.subCategory &&
                  subCategoryData.subCategory.length !== 0 &&
                  subCategoryData.subCategory.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {categoryData?.category &&
                              categoryData.category.length !== 0 &&
                              categoryData.category
                                .filter((cat) => cat.id === item.category)
                                .map((it) => it.name)}
                            /{item.name}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex jsl">
                            {brandData?.brandList &&
                              brandData.brandList.length !== 0 &&
                              brandData.brandList
                                .filter(
                                  (brand) => brand.subcategory === item.id,
                                )
                                .map((it) => {
                                  return (
                                    <ListItem key={it.key} className="p-1">
                                      <Chip
                                        key={it.id}
                                        className="me-1"
                                        label={it.name}
                                        onClick={(event) =>
                                          handleClick(event, it.key)
                                        }
                                        onDelete={(event) =>
                                          handleDelete(event, it.id)
                                        }
                                      />
                                    </ListItem>
                                  );
                                })}
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
              count={subCategoryData?.totalPages}
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

export default Brand;
