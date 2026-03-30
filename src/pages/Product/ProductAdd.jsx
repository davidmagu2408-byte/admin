import Breadcrumbs from "@mui/material/Breadcrumbs";
import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import HomeIcon from "@mui/icons-material/Home";
import { FaImages } from "react-icons/fa";
import Button from "@mui/material/Button";
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { fetchDataFromAPI, postData } from "../../apis/api";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";

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

  const addImage = (e) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview((prev) => [...prev, ...previews]);
  };

  const handleChangeCategory = (e) => {
    setSelectedCategory(e.target.value ?? "");
  };

  const handleChangeSubCategory = (e) => {
    setSelectedSubCategory(e.target.value ?? "");
  };

  const handleChangeBrand = (e) => {
    setSelectedBrand(e.target.value ?? "");
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
    postData("/product/create", formData).then((response) => {
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
        setSubcategories(data.subCategory);
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
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Product Add</h5>
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
              <StyledBreadcrumb component="a" href="#" label="Product" />
              <StyledBreadcrumb component="a" href="#" label="Add Product" />
            </Breadcrumbs>
          </div>
        </div>
        <form className="form" onSubmit={addProduct}>
          <div className="row">
            <div className="col-sm-12">
              <div className="card p-4 mt-0">
                <h4>Basic information</h4>
                <div className="form-group">
                  <h6>Product Name</h6>
                  <input type="text" name="name" onChange={changeInput} />
                </div>
                <div className="form-group">
                  <h6>Description</h6>
                  <input
                    type="text"
                    name="description"
                    onChange={changeInput}
                  />
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>Category</h6>
                      <Select
                        value={selectedCategory}
                        onChange={handleChangeCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">None</MenuItem>
                        {categories &&
                          categories.length !== 0 &&
                          categories.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                              {item.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>Sub Category</h6>
                      <Select
                        value={selectedSubCategory}
                        onChange={handleChangeSubCategory}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">None</MenuItem>
                        {subcategories &&
                          subcategories.length !== 0 &&
                          subcategories
                            .filter(
                              (item) => item.category === selectedCategory,
                            )
                            .map((item) => (
                              <MenuItem key={item._id} value={item._id}>
                                {item.name}
                              </MenuItem>
                            ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>Price</h6>
                      <input type="text" name="price" onChange={changeInput} />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>Old Price</h6>
                      <input
                        type="text"
                        name="oldPrice"
                        onChange={changeInput}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>isFeatured</h6>
                      <Select
                        value={isFeatured}
                        onChange={handelChangeFeatured}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">None</MenuItem>
                        <MenuItem value={true}>True</MenuItem>
                        <MenuItem value={false}>False</MenuItem>
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>Count In Stock</h6>
                      <input
                        type="text"
                        name="countInStock"
                        onChange={changeInput}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-group">
                      <h6>Brand</h6>
                      <Select
                        value={selectedBrand}
                        onChange={handleChangeBrand}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        className="w-100"
                      >
                        <MenuItem value="">None</MenuItem>
                        {brands &&
                          brands.length !== 0 &&
                          brands
                            .filter(
                              (item) =>
                                item.subcategory === selectedSubCategory,
                            )
                            .map((item) => (
                              <MenuItem key={item._id} value={item._id}>
                                {item.name}
                              </MenuItem>
                            ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-group">
                      <h6>Discount</h6>
                      <input
                        type="number"
                        name="discount"
                        onChange={changeInput}
                      />
                    </div>
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
                              setProduct((prev) => ({
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
export default ProductAdd;
