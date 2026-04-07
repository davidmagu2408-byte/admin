import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  editProduct,
  fetchProductById,
  fetchDataFromAPI,
} from "../../apis/api";
import Rating from "@mui/material/Rating";
import toast, { Toaster } from "react-hot-toast";
import PageHeader from "../../components/PageHeader";
import ImageUpload from "../../components/ImageUpload";
import FormInput from "../../components/FormInput";
import DropdownField from "../../components/DropdownField";

const ProductEdit = () => {
  const { id } = useParams();
  // product data fetched from API by id
  const [product, setProduct] = useState({});
  // categories, subcategories, brand list fetched from API
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [imagePreview, setImagePreview] = useState([]);
  // selected category id, subcategory id, brand id
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  //
  const [isFeatured, setIsFeatured] = useState("");
  const [valueRate, setValueRate] = useState(0);
  const navigation = useNavigate();

  const changeInput = (e) => {
    setProduct(() => ({
      ...product,
      [e.target.name]: e.target.value,
    }));
  };
  const EditProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    product.category = selectedCategory;
    product.subcategory = selectedSubCategory;
    product.brand = selectedBrand;
    product.isFeatured = isFeatured;
    product.rating = valueRate;
    Object.keys(product).forEach((key) => {
      if (key !== "images") {
        formData.append(key, product[key]);
      }
    });
    const existingImages = [];
    const newFiles = [];
    product.images.forEach((img) => {
      if (typeof img === "string") {
        existingImages.push(img); // Existing image URLs
      } else {
        newFiles.push(img); // New File objects from input
      }
    });
    formData.append("existingImages", JSON.stringify(existingImages));
    newFiles.forEach((file) => formData.append("images", file));
    editProduct(id, formData)
      .then((res) => {
        if (res && res.success === true) {
          toast.success("Cập nhật sản phẩm thành công!");
          setTimeout(() => navigation("/product"), 1000);
        } else {
          toast.error(res?.message || "Cập nhật thất bại. Vui lòng thử lại.");
        }
      })
      .catch(() => {
        toast.error("Lỗi kết nối. Vui lòng thử lại.");
      });
  };

  useEffect(() => {
    fetchProductById(id).then((res) => {
      const p = res?.product;
      if (!p) return;
      setProduct(p);
      setImagePreview(p.images || []);
      setSelectedCategory(p.category?._id || p.category?.id || "");
      setSelectedSubCategory(p.subcategory?._id || p.subcategory?.id || "");
      setSelectedBrand(p.brand?._id || p.brand?.id || "");
      setIsFeatured(p.isFeatured ?? false);
      setValueRate(p.rating || 0);
    });
    fetchDataFromAPI("/category")
      .then((data) => {
        setCategories(data.category);
      })
      .catch(() => setCategories([]));
    fetchDataFromAPI("/subcategory")
      .then((data) => {
        setSubcategories(data.subCategory);
      })
      .catch(() => setSubcategories([]));
    fetchDataFromAPI("/brand")
      .then((data) => {
        setBrands(data.brandList);
      })
      .catch(() => setBrands([]));
  }, [id]);

  return (
    <div className="right-content w-100">
      <PageHeader
        title="Product Edit"
        breadcrumbs={[{ label: "Product" }, { label: "Edit Product" }]}
      />
      <form className="form" onSubmit={EditProduct}>
        <div className="row">
          <div className="col-sm-12">
            <div className="card p-4 mt-0">
              <h4>Basic information</h4>
              <FormInput
                label="Product Name"
                name="name"
                onChange={changeInput}
                value={product.name || ""}
              />
              <FormInput
                label="Description"
                name="description"
                onChange={changeInput}
                value={product.description || ""}
              />
              <div className="row">
                <div className="col">
                  <DropdownField
                    label="Category"
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    options={categories}
                  />
                </div>
                <div className="col">
                  <DropdownField
                    label="Sub Category"
                    value={selectedSubCategory}
                    onChange={setSelectedSubCategory}
                    options={subcategories?.filter(
                      (item) => item.category === selectedCategory,
                    )}
                  />
                </div>
                <div className="col">
                  <FormInput
                    label="Price"
                    name="price"
                    onChange={changeInput}
                    value={product.price || 0}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <FormInput
                    label="Old Price"
                    name="oldPrice"
                    onChange={changeInput}
                    value={product.oldPrice || 0}
                  />
                </div>
                <div className="col">
                  <DropdownField
                    label="isFeatured"
                    value={isFeatured}
                    onChange={setIsFeatured}
                    options={[
                      { _id: true, name: "True" },
                      { _id: false, name: "False" },
                    ]}
                  />
                </div>
                <div className="col">
                  <FormInput
                    label="Count In Stock"
                    name="countInStock"
                    onChange={changeInput}
                    value={product.countInStock || 0}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <DropdownField
                    label="Brand"
                    value={selectedBrand}
                    onChange={setSelectedBrand}
                    options={brands?.filter(
                      (item) => item.subcategory === selectedSubCategory,
                    )}
                  />
                </div>
                <div className="col">
                  <FormInput
                    label="Discount"
                    name="discount"
                    type="number"
                    onChange={changeInput}
                    value={product.discount || 0}
                  />
                </div>
                <div className="col">
                  <div className="form-group">
                    <h6>Rating</h6>
                    <Rating
                      name="half-rating-read"
                      value={valueRate}
                      defaultValue={product.rating ?? 0}
                      precision={0.5}
                      onChange={(e) => setValueRate(e.target.value)}
                      className="pt-2"
                    />
                  </div>
                </div>
              </div>
              <ImageUpload
                images={product.images || []}
                previews={imagePreview}
                onImagesChange={(imgs) =>
                  setProduct((prev) => ({ ...prev, images: imgs }))
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
      <Toaster position="top-right" />
    </div>
  );
};
export default ProductEdit;
