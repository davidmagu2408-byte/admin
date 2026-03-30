import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { postData, fetchDataFromAPI } from "../../apis/api";
import toast, { Toaster } from "react-hot-toast";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const BrandAdd = () => {
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [brand, setBrand] = useState({
    name: "",
    subcategory: "",
  });
  const [selectedsubCategory, setSelectedSubCategory] = useState("");

  const handleChangeSubCategory = (e) => {
    setSelectedSubCategory(e.target.value ?? []);
  };

  const changeInput = (e) => {
    setBrand(() => ({
      ...brand,
      [e.target.name]: e.target.value,
    }));
  };

  const addBrandCategory = (e) => {
    e.preventDefault();
    const formElement = e.target;
    brand.subcategory = selectedsubCategory;
    postData("/brand/create", brand)
      .then((response) => {
        if (response && response.success === true) {
          toast.success("Brand added successfully!");
          formElement.reset();
          setSelectedSubCategory("");
          setBrand({
            name: "",
            subcategory: "",
          });
          window.location.href = "/brand";
        } else {
          toast.error("Failed to add Brand. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error adding brand:", error);
        toast.error("Failed to add Brand." + error);
      });
  };

  useEffect(() => {
    fetchDataFromAPI("/subcategory")
      .then((data) => {
        setSubCategoryData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    fetchDataFromAPI("/category")
      .then((data) => {
        setCategoryData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />;
      <div className="right-content w-100">
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Brand Add</h5>
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
              <StyledBreadcrumb component="a" href="#" label="Brand" />
              <StyledBreadcrumb component="a" href="#" label="Add Brand" />
            </Breadcrumbs>
          </div>
        </div>
        <form className="form" onSubmit={addBrandCategory}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <div className="form-group">
                  <h6>Category</h6>
                  <Select
                    value={selectedsubCategory}
                    onChange={handleChangeSubCategory}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    className="w-100"
                  >
                    {subCategoryData?.subCategory &&
                      subCategoryData.subCategory.length !== 0 &&
                      subCategoryData.subCategory.map((item) => {
                        return (
                          <MenuItem key={item._id} value={item._id}>
                            {categoryData?.category &&
                              categoryData.category.length !== 0 &&
                              categoryData.category
                                .filter((cat) => cat.id === item.category)
                                .map((it) => it.name)}
                            /{item.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </div>
                <div className="form-group">
                  <h6>Brand</h6>
                  <input type="text" name="name" onChange={changeInput} />
                </div>
                <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                  ADD BRAND
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default BrandAdd;
