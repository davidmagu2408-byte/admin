import Button from "@mui/material/Button";
import { useState } from "react";
import { postData } from "../../apis/api";
import toast, { Toaster } from "react-hot-toast";
import PageHeader from "../../components/PageHeader";
import ImageUpload from "../../components/ImageUpload";
import FormInput from "../../components/FormInput";

const CategoryAdd = () => {
  const [category, setCategory] = useState({
    name: "",
    color: "",
    images: [],
  });
  const [imagePreview, setImagePreview] = useState([]);

  const changeInput = (e) => {
    setCategory(() => ({
      ...category,
      [e.target.name]: e.target.value,
    }));
  };

  const addCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    const formElement = e.target;
    formData.append("name", category.name);
    formData.append("color", category.color);
    if (
      category.images &&
      Array.isArray(category.images) &&
      category.images.length > 0
    ) {
      category.images.forEach((file) => formData.append("images", file));
    }
    postData("/category/create", formData).then((response) => {
      if (response && response.success === true) {
        toast.success("Category added successfully!");
        formElement.reset();
        setImagePreview([]);
        setCategory({
          name: "",
          color: "",
          images: [],
        });
      } else {
        toast.error("Failed to add category. Please try again.");
      }
    });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />;
      <div className="right-content w-100">
        <PageHeader
          title="Category Add"
          breadcrumbs={[{ label: "Category" }, { label: "Add Category" }]}
        />
        <form className="form" onSubmit={addCategory}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <FormInput
                  label="Category Name"
                  name="name"
                  onChange={changeInput}
                />
                <FormInput label="Color" name="color" onChange={changeInput} />
                <ImageUpload
                  images={category.images}
                  previews={imagePreview}
                  onImagesChange={(imgs) =>
                    setCategory((prev) => ({ ...prev, images: imgs }))
                  }
                  onPreviewsChange={setImagePreview}
                />
                <br />
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
export default CategoryAdd;
