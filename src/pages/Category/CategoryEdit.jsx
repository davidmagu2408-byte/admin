import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { editCategory, fetchCategoryById } from "../../apis/api";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import ImageUpload from "../../components/ImageUpload";
import FormInput from "../../components/FormInput";
import toast from "react-hot-toast";

const CategoryEdit = () => {
  const [category, setCategory] = useState({
    name: "",
    color: "",
    images: [],
  });
  const { id } = useParams();
  const [imagePreview, setImagePreview] = useState([]);
  const navigation = useNavigate();

  const changeInput = (e) => {
    setCategory(() => ({
      ...category,
      [e.target.name]: e.target.value,
    }));
  };

  const EditCategory = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("color", category.color);
    const existingImages = [];
    const newFiles = [];
    category.images.forEach((img) => {
      if (typeof img === "string") {
        existingImages.push(img);
      } else {
        newFiles.push(img);
      }
    });
    formData.append("existingImages", JSON.stringify(existingImages));
    newFiles.forEach((file) => formData.append("images", file));
    editCategory(id, formData).then((res) => {
      if (res && res.success === true) {
        toast.success("Chỉnh sửa danh mục thành công");
        navigation("/category");
      } else {
        toast.error("Chỉnh sửa danh mục thất bại. Vui lòng thử lại.");
      }
    });
  };

  useEffect(() => {
    fetchCategoryById(id).then((data) => {
      setCategory(data || []);
      setImagePreview(data.images || []);
    });
  }, [id]);

  return (
    <div className="right-content w-100">
      <PageHeader
        title="Category List"
        breadcrumbs={[{ label: "Category" }, { label: "Edit Category" }]}
      />
      <form className="form" onSubmit={EditCategory}>
        <div className="row">
          <div className="col-sm-9">
            <div className="card p-4">
              <FormInput
                label="Edit Category"
                name="name"
                value={category.name}
                onChange={changeInput}
              />
              <FormInput
                label="Color"
                name="color"
                value={category.color}
                onChange={changeInput}
              />
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
  );
};
export default CategoryEdit;
