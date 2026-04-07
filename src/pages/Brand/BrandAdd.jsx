import { useEffect, useState } from "react";
import { postData, fetchDataFromAPI } from "../../apis/api";
import toast, { Toaster } from "react-hot-toast";
import Button from "@mui/material/Button";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/FormInput";
import DropdownField from "../../components/DropdownField";

const BrandAdd = () => {
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [brand, setBrand] = useState({
    name: "",
    subcategory: "",
  });
  const [selectedsubCategory, setSelectedSubCategory] = useState("");

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
        toast.error(error.response?.data?.message || "Failed to add Brand.");
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
        <PageHeader
          title="Brand Add"
          breadcrumbs={[{ label: "Brand" }, { label: "Add Brand" }]}
        />
        <form className="form" onSubmit={addBrandCategory}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <DropdownField
                  label="Category"
                  value={selectedsubCategory}
                  onChange={setSelectedSubCategory}
                  options={subCategoryData?.subCategory}
                  displayKey={(item) => {
                    const catName = categoryData?.category
                      ?.filter((cat) => cat.id === item.category)
                      .map((it) => it.name)
                      .join("");
                    return `${catName}/${item.name}`;
                  }}
                />
                <FormInput label="Brand" name="name" onChange={changeInput} />
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
