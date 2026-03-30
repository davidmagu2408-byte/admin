import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromAPI, postData } from "../../apis/api";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const SubCategoryAdd = () => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value ?? []);
  };
  const changeInput = (e) => {
    setSubCategoryData(() => ({
      ...subCategoryData,
      [e.target.name]: e.target.value,
    }));
  };
  const addsubCategory = (e) => {
    e.preventDefault();
    const formElement = e.target;
    subCategoryData.category = selectedCategory;
    postData("/subcategory/create", subCategoryData).then((response) => {
      console.log(response);
      if (response && response.success) {
        toast.success("Sub Category added successfully!");
        formElement.reset();
        setSelectedCategory("");
        setSubCategoryData({
          name: "",
          category: "",
        });
      } else {
        toast.error("Failed to add Sub Category. Please try again.");
      }
    });
  };
  useEffect(() => {
    fetchDataFromAPI("/category").then((data) => {
      setCategories(data.category);
    });
  }, []);
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />;
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Sub Category Add</h5>
          <div className="ms-auto d-flex align-items-center">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ms-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                component="a"
                href="#"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb component="a" href="#" label="Category" />
              <StyledBreadcrumb
                component="a"
                href="#"
                label="Add Sub Category"
              />
            </Breadcrumbs>
          </div>
        </div>
        <form className="form" onSubmit={addsubCategory}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <div className="form-group">
                  <h6>Parent Category</h6>
                  <Select
                    value={selectedCategory}
                    onChange={handleChangeCategory}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="w-100"
                  >
                    {categories &&
                      categories.length !== 0 &&
                      categories.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </div>
                <div className="form-group">
                  <h6>Sub Category</h6>
                  <input type="text" name="name" onChange={changeInput} />
                </div>
                <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                  PUBLISH AND VIEW
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default SubCategoryAdd;
