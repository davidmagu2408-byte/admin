import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { FaImages } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { editCategory, fetchCategoryById } from "../../apis/api";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";

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
  const addImage = (e) => {
    const files = Array.from(e.target.files);
    setCategory((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...newPreviews]);
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
        existingImages.push(img); // Existing image URLs
      } else {
        newFiles.push(img); // New File objects from input
      }
    });
    formData.append("existingImages", JSON.stringify(existingImages));
    newFiles.forEach((file) => formData.append("images", file));
    editCategory(id, formData).then((res) => {
      console.log(res);
      if (res && res.success === true) {
        alert("Edit Category Successfully");
        navigation("/category");
      } else {
        alert("Failed to edit category. Please try again.");
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
      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
        <h5 className="mb-0">Category List</h5>
        <div className="ms-auto d-flex align-items-center">
          <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Category" />
            <StyledBreadcrumb component="a" href="#" label="Edit Category" />
          </Breadcrumbs>
        </div>
      </div>
      <form className="form" onSubmit={EditCategory}>
        <div className="row">
          <div className="col-sm-9">
            <div className="card p-4">
              <div className="form-group">
                <h6>Edit Category</h6>
                <input
                  type="text"
                  name="name"
                  value={category.name}
                  onChange={changeInput}
                  multiple
                />
              </div>
              <div className="form-group">
                <h6>Color</h6>
                <input
                  type="text"
                  name="color"
                  value={category.color}
                  onChange={changeInput}
                  multiple
                />
              </div>
              <div className="imagesUploadSec">
                <h5 className="mb-4">Media And Published</h5>
                <div className="imgUploadBox d-flex align-items-center">
                  {imagePreview.map((src, index) => (
                    <div key={index} className="uploadBox position-relative">
                      <span className="remove">
                        <IoMdClose
                          onClick={() => {
                            setImagePreview((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                            setCategory((prev) => ({
                              ...prev,
                              images: prev.images.filter((_, i) => i !== index),
                            }));
                          }}
                        />
                      </span>
                      <img src={src} alt={`Preview ${index + 1}`} />
                    </div>
                  ))}
                  <div className="uploadBox">
                    <input type="file" multiple onChange={addImage} />
                    <div className="info">
                      <FaImages />
                      <h5>image upload</h5>
                    </div>
                  </div>
                </div>
                <br />
                <Button type="submit" className="btn-blue btn-lg btn-big w-100">
                  PUBLISH AND VIEW
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CategoryEdit;
