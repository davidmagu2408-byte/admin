import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchDataFromAPI, postData } from "../../apis/api";
import Button from "@mui/material/Button";
import PageHeader from "../../components/PageHeader";
import FormInput from "../../components/FormInput";
import DropdownField from "../../components/DropdownField";

const SubCategoryAdd = () => {
  const [subCategoryData, setSubCategoryData] = useState({
    name: "",
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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
        <PageHeader
          title="Sub Category Add"
          breadcrumbs={[{ label: "Category" }, { label: "Add Sub Category" }]}
        />
        <form className="form" onSubmit={addsubCategory}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <DropdownField
                  label="Parent Category"
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  options={categories}
                />
                <FormInput
                  label="Sub Category"
                  name="name"
                  onChange={changeInput}
                />
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
