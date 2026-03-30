import StyledBreadcrumb from "../../utils/StyledBreadcrumb";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import HomeIcon from "@mui/icons-material/Home";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import { fetchDataFromAPI, deleteData } from "../../apis/api";
import { FaRegTrashAlt } from "react-icons/fa";
import Pagination from "@mui/material/Pagination";
import toast, { Toaster } from "react-hot-toast";

const Banner = () => {
  const [bannerData, setBannerData] = useState({
    bannerList: [],
    totalPages: 1,
  });

  useEffect(() => {
    fetchDataFromAPI("/banner").then((data) => setBannerData(data));
  }, []);

  const handleChange = (event, value) => {
    fetchDataFromAPI(`/banner?page=${value}`).then((data) =>
      setBannerData(data),
    );
  };

  const deleteBanner = (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa banner này?")) return;
    deleteData(`/banner/delete/${id}`)
      .then(() => {
        toast.success("Xóa banner thành công!");
        setBannerData((prev) => ({
          ...prev,
          bannerList: prev.bannerList.filter((b) => b.id !== id),
        }));
      })
      .catch(() => {
        toast.error("Xóa banner thất bại.");
      });
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="right-content w-100 page-transition">
        <div className="card shadow border-0 w-100 flex-row p-4 align-items-center">
          <h5 className="mb-0">Banner List</h5>
          <div className="ms-auto d-flex align-items-center">
            <Breadcrumbs
              aria-label="breadcrumb"
              className="ml-auto breadcrumbs_"
            >
              <StyledBreadcrumb
                component="a"
                href="#"
                label="Dashboard"
                icon={<HomeIcon fontSize="small" />}
              />
              <StyledBreadcrumb component="a" href="#" label="Banners" />
            </Breadcrumbs>
            <a href="/banner/add">
              <Button className="btn-blue ms-3 ps-3 pe-3">Add Banner</Button>
            </a>
          </div>
        </div>
        <div className="card shadow border-0 w-100 mt-4">
          <div className="card-body">
            <table className="table table-bordered table-striped v-align">
              <thead className="thead-dark">
                <tr>
                  <th scope="col" style={{ width: "80px" }}>
                    #
                  </th>
                  <th scope="col">NAME</th>
                  <th scope="col">IMAGES</th>
                  <th scope="col">TYPE</th>
                  <th scope="col" style={{ width: "100px" }}>
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {bannerData?.bannerList &&
                bannerData.bannerList.length > 0 ? (
                  bannerData.bannerList.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2 flex-wrap">
                          {item.images?.map((img, i) => (
                            <div
                              key={i}
                              className="imgWrapper"
                              style={{
                                width: "100px",
                                height: "60px",
                                overflow: "hidden",
                                borderRadius: "5px",
                              }}
                            >
                              <img
                                src={img}
                                alt={`banner-${i}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>{item.type}</td>
                      <td>
                        <div className="actions d-flex align-items-center">
                          <Button
                            className="error"
                            color="error"
                            onClick={() => deleteBanner(item.id)}
                          >
                            <FaRegTrashAlt />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      Chưa có banner nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex tableFooter me-4">
            <Pagination
              count={bannerData?.totalPages || 1}
              color="primary"
              className="pagination"
              showFirstButton
              showLastButton
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default Banner;
