import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { fetchDataFromAPI, deleteData } from "../../apis/api";
import Pagination from "@mui/material/Pagination";
import Chip from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import toast, { Toaster } from "react-hot-toast";
import PageHeader from "../../components/PageHeader";

const SubCategory = () => {
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [page, setPage] = useState(1);

  const loadData = () => {
    fetchDataFromAPI("/subcategory").then((data) => setSubCategoryData(data));
    fetchDataFromAPI("/category").then((data) => setCategoryData(data));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
    fetchDataFromAPI(`/category?page=${value}`).then((data) =>
      setCategoryData(data),
    );
  };

  const handleDelete = async (event, chipId) => {
    if (!window.confirm("Bạn có chắc muốn xoá danh mục phụ này?")) return;
    const res = await deleteData(`/subcategory/delete/${chipId}`);
    if (res?.data?.success || res?.status === 200) {
      toast.success("Đã xoá danh mục phụ");
      loadData();
    } else {
      toast.error("Xoá thất bại");
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="right-content w-100 page-transition">
        <PageHeader
          title="Sub Category List"
          breadcrumbs={[{ label: "Category" }]}
          addButtonText="Add Sub Category"
          addButtonLink="/subcategory/add"
        />
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
                            {subCategoryData.subCategoryList &&
                              subCategoryData.subCategoryList.length !== 0 &&
                              subCategoryData.subCategoryList
                                .filter(
                                  (itemSub) => itemSub.category === item.id,
                                )
                                .map((sub) => {
                                  return (
                                    <ListItem key={sub.id} className="p-1">
                                      <Chip
                                        key={sub.id}
                                        className="me-1"
                                        label={sub.name}
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
              count={categoryData?.totalPages || 1}
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

export default SubCategory;
