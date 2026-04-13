import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { fetchDataFromAPI, deleteData } from "../../apis/api";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import PageHeader from "../../components/PageHeader";
import toast from "react-hot-toast";

const Brand = () => {
  const [brandData, setBrandData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchDataFromAPI("/category").then((data) => setCategoryData(data));
    fetchDataFromAPI("/subcategory").then((data) => setSubCategoryData(data));
    fetchDataFromAPI("/brand").then((brand) => setBrandData(brand));
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    fetchDataFromAPI(`/subcategory?page=${value}`).then((data) =>
      setSubCategoryData(data),
    );
  };

  const handleClick = (event, chipKey) => {
    // reserved for future use
  };

  const handleDelete = (event, chipId) => {
    if (!window.confirm("Bạn có chắc muốn xoá thương hiệu này?")) return;
    deleteData(`/brand/delete/${chipId}`)
      .then(() => {
        toast.success("Xoá thương hiệu thành công");
        setBrandData((prev) => ({
          ...prev,
          brandList: prev.brandList.filter((b) => b.id !== chipId),
        }));
      })
      .catch(() => {
        toast.error("Xoá thương hiệu thất bại");
      });
  };

  return (
    <>
      <div className="right-content w-100 page-transition">
        <PageHeader
          title="Brand List"
          breadcrumbs={[{ label: "Brand" }]}
          addButtonText="Add Brand"
          addButtonLink="/brand/add"
        />
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
                {subCategoryData?.subCategoryList &&
                  subCategoryData.subCategoryList.length !== 0 &&
                  subCategoryData.subCategoryList.map((item) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {categoryData?.categoryList &&
                              categoryData.categoryList.length !== 0 &&
                              categoryData.categoryList
                                .filter((cat) => cat.id === item.category)
                                .map((it) => it.name)}
                            /{item.name}
                          </div>
                        </td>
                        <td>
                          <div className="d-flex jsl">
                            {console.log(categoryData)}
                            {brandData?.brandList &&
                              brandData.brandList.length !== 0 &&
                              brandData.brandList
                                .filter(
                                  (brand) => brand.subcategory.id === item.id,
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
              count={subCategoryData?.totalPages || 1}
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
    </>
  );
};

export default Brand;
