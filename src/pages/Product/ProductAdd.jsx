import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { fetchDataFromAPI, postData } from "../../apis/api";
import Rating from "@mui/material/Rating";
import PageHeader from "../../components/PageHeader";
import ImageUpload from "../../components/ImageUpload";
import FormInput from "../../components/FormInput";
import DropdownField from "../../components/DropdownField";

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    brand: "",
    price: 0,
    oldPrice: 0,
    category: "",
    subcategory: "",
    countInStock: "",
    rating: 0,
    numReviews: 0,
    isFeatured: false,
    images: [],
    discount: 0,
  });
  const [imagePreview, setImagePreview] = useState([]);

  // categories, subcategories, brand list fetched from API
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [brands, setBrands] = useState([]);
  // selected category id
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");

  //
  const [isFeatured, setIsFeatured] = useState("");
  const [valueRate, setValueRate] = useState(0);

  const changeInput = (e) => {
    setProduct(() => ({
      ...product,
      [e.target.name]: e.target.value,
    }));
  };

  const changeRating = (e) => {
    setValueRate(e.target.value);
  };
  const handelChangeFeatured = (e) => {
    setIsFeatured(e.target.value);
  };

  const addProduct = (e) => {
    e.preventDefault();
    const formElement = e.target;
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
    if (
      product.images &&
      Array.isArray(product.images) &&
      product.images.length > 0
    ) {
      product.images.forEach((file) => formData.append("images", file));
    }
    postData("/product/create", formData)
      .then((response) => {
        if (response && response._id) {
          toast.success("Product added successfully!");
          formElement.reset();
          setImagePreview([]);
          setProduct({
            name: "",
            description: "",
            brand: "",
            price: 0,
            oldPrice: 0,
            category: "",
            subcategory: "",
            countInStock: "",
            rating: 0,
            numReviews: 0,
            isFeatured: false,
            images: [],
            discount: 0,
          });
        } else {
          toast.error("Failed to add product. Please try again.");
        }
      })
      .catch(() => {
        toast.error("Lỗi kết nối. Vui lòng thử lại.");
      });
  };

  // fetch categories once on mount
  useEffect(() => {
    fetchDataFromAPI("/category")
      .then((data) => {
        setCategories(data.category);
      })
      .catch(() => setCategories([]));
    fetchDataFromAPI("/subcategory")
      .then((data) => {
        setSubcategories(data.subCategoryList);
      })
      .catch(() => setSubcategories([]));
    fetchDataFromAPI("/brand")
      .then((data) => {
        setBrands(data.brandList);
      })
      .catch(() => setBrands([]));
  }, []);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />;
      <div className="right-content w-100">
        <PageHeader
          title="Product Add"
          breadcrumbs={[{ label: "Product" }, { label: "Add Product" }]}
        />
        <form className="form" onSubmit={addProduct}>
          <div className="row">
            <div className="col-sm-12">
              <div className="card p-4 mt-0">
                <h4>Basic information</h4>
                <FormInput
                  label="Product Name"
                  name="name"
                  onChange={changeInput}
                />
                <FormInput
                  label="Description"
                  name="description"
                  onChange={changeInput}
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
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <FormInput
                      label="Old Price"
                      name="oldPrice"
                      onChange={changeInput}
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
                    />
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>Rating</h6>
                      <Rating
                        name="half-rating-read"
                        defaultValue={valueRate ?? 0}
                        precision={0.5}
                        onChange={changeRating}
                        className="pt-2"
                      />
                    </div>
                  </div>
                </div>
                <ImageUpload
                  images={product.images}
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
      </div>
    </>
  );
};
export default ProductAdd;
