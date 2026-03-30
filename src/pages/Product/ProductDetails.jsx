import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../apis/api";
import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import ProductZoom from "../../components/ProductZoom";
import { MdOutlineBrandingWatermark } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { MdOutlineRateReview } from "react-icons/md";
import { BsPatchCheckFill } from "react-icons/bs";

const ProductDetails = () => {
  const { id } = useParams();
  // product data fetched from API by id
  const [product, setProduct] = useState([]);
  // categories, subcategories, brand list fetched from API

  useEffect(() => {
    fetchProductById(id).then((data) => {
      setProduct(data.product || []);
    });
  }, [id]);

  return (
    <div className="right-content w-100 productDetails">
      <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
        <h5 className="mb-0">Product View</h5>
        <div className="ms-auto d-flex align-items-center">
          <Breadcrumbs aria-label="breadcrumb" className="ms-auto breadcrumbs_">
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Dashboard"
              icon={<HomeIcon fontSize="small" />}
            />
            <StyledBreadcrumb component="a" href="#" label="Product" />
            <StyledBreadcrumb component="a" href="#" label="Product Details" />
          </Breadcrumbs>
        </div>
      </div>
      <div className="card productDetailsSEction">
        <div className="row">
          <div className="col-md-5">
            <div className="sliderWrapper pt-3 pb-3 pe-4 ps-4">
              <h6 className="mb-4">Product Gallery</h6>
              <div className="slider">
                <ProductZoom
                  value={product.images}
                  discount={product.discount}
                />
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="pt-3 pb-3 pe-4 ps-4">
              <h6 className="mb-4">Product Details</h6>
              <h4>{product.name}</h4>
              <div className="productInfo mt-4">
                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <MdOutlineBrandingWatermark />
                    </span>
                    <span className="name">Brand</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>{product.brand?.name}</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <BiCategory />
                    </span>
                    <span className="name">Category</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>{product.category?.name}</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <MdOutlineRateReview />
                    </span>
                    <span className="name">Review</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>Herbal Max</span>
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-sm-3 d-flex align-items-center">
                    <span className="icon">
                      <BsPatchCheckFill />
                    </span>
                    <span className="name">Published</span>
                  </div>
                  <div className="col-sm-9">
                    : <span>{product.dateCreated}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div>
            <h6 className="mt-4 mb-3">Product Description</h6>
            <p>{product.description}</p>
            <br />
            <br />
            <h6 className="mt-4 mb-3">Customer Reviews</h6>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductDetails;
