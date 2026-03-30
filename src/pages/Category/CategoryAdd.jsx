import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { FaImages } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useState } from "react";
import { postData } from "../../apis/api";
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

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
  const addImage = (e) => {
    const files = Array.from(e.target.files);
    setCategory((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...previews]);
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
    console.log(formData);
    console.log(category);
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
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Category Add</h5>
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
              <StyledBreadcrumb component="a" href="#" label="Add Category" />
            </Breadcrumbs>
          </div>
        </div>
        <form className="form" onSubmit={addCategory}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <div className="form-group">
                  <h6>Category Name</h6>
                  <input type="text" name="name" onChange={changeInput} />
                </div>
                <div className="form-group">
                  <h6>Color</h6>
                  <input type="text" name="color" onChange={changeInput} />
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
                                images: prev.images.filter(
                                  (_, i) => i !== index,
                                ),
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
                  <Button
                    type="submit"
                    className="btn-blue btn-lg btn-big w-100"
                  >
                    PUBLISH AND VIEW
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default CategoryAdd;
