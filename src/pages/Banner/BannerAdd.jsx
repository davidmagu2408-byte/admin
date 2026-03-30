import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { FaImages } from "react-icons/fa";
import Button from "@mui/material/Button";
import { useState } from "react";
import { postData } from "../../apis/api";
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const BannerAdd = () => {
  const [banner, setBanner] = useState({
    name: "",
    type: "home",
    images: [],
  });
  const [imagePreview, setImagePreview] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const changeInput = (e) => {
    setBanner((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addImage = (e) => {
    const files = Array.from(e.target.files);
    setBanner((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(imagePreview[index]);
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
    setBanner((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addBanner = (e) => {
    e.preventDefault();
    if (!banner.name.trim()) {
      toast.error("Vui lòng nhập tên banner");
      return;
    }
    if (banner.images.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 ảnh");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", banner.name);
    formData.append("type", banner.type);
    banner.images.forEach((file) => formData.append("images", file));

    postData("/banner/create", formData)
      .then((response) => {
        if (response && response.success === true) {
          toast.success("Thêm banner thành công!");
          e.target.reset();
          setImagePreview([]);
          setBanner({ name: "", type: "home", images: [] });
        } else {
          toast.error("Thêm banner thất bại.");
        }
      })
      .catch(() => {
        toast.error("Có lỗi xảy ra.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="right-content w-100 page-transition">
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Add Banner</h5>
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
              <StyledBreadcrumb component="a" href="#" label="Banners" />
              <StyledBreadcrumb component="a" href="#" label="Add Banner" />
            </Breadcrumbs>
          </div>
        </div>
        <form className="form" onSubmit={addBanner}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <div className="form-group">
                  <h6>Banner Name</h6>
                  <input
                    type="text"
                    name="name"
                    value={banner.name}
                    onChange={changeInput}
                  />
                </div>
                <div className="form-group">
                  <h6>Type</h6>
                  <Select
                    value={banner.type}
                    name="type"
                    onChange={changeInput}
                    className="w-100"
                    size="small"
                  >
                    <MenuItem value="home">Home</MenuItem>
                    <MenuItem value="promotion">Promotion</MenuItem>
                    <MenuItem value="category">Category</MenuItem>
                  </Select>
                </div>
                <div className="imagesUploadSec">
                  <h5 className="mb-4">Media And Published</h5>
                  <div className="imgUploadBox d-flex align-items-center">
                    {imagePreview.map((src, index) => (
                      <div key={index} className="uploadBox position-relative">
                        <span className="remove">
                          <IoMdClose onClick={() => removeImage(index)} />
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
                    disabled={isLoading}
                    className="btn-blue btn-lg btn-big w-100"
                  >
                    {isLoading ? "ĐANG TẢI LÊN..." : "PUBLISH AND VIEW"}
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

export default BannerAdd;
