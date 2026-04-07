import Button from "@mui/material/Button";
import { useState } from "react";
import { postData } from "../../apis/api";
import toast, { Toaster } from "react-hot-toast";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PageHeader from "../../components/PageHeader";
import ImageUpload from "../../components/ImageUpload";
import FormInput from "../../components/FormInput";

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
        <PageHeader
          title="Add Banner"
          breadcrumbs={[{ label: "Banners" }, { label: "Add Banner" }]}
        />
        <form className="form" onSubmit={addBanner}>
          <div className="row">
            <div className="col-sm-9">
              <div className="card p-4">
                <FormInput
                  label="Banner Name"
                  name="name"
                  value={banner.name}
                  onChange={changeInput}
                />
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
                <ImageUpload
                  images={banner.images}
                  previews={imagePreview}
                  onImagesChange={(imgs) =>
                    setBanner((prev) => ({ ...prev, images: imgs }))
                  }
                  onPreviewsChange={setImagePreview}
                />
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
        </form>
      </div>
    </>
  );
};

export default BannerAdd;
