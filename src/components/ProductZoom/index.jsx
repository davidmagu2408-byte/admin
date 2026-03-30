import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useState } from "react";

const ProductZoom = ({ value, discount }) => {
  const [zoomSliderBig, setzoomSliderBig] = useState(null);
  return (
    <div className="productZoom">
      <div className="productZoom productZoomBig position-relative mb-3">
        <div className="badge badge-primary">{discount ? discount + "%" : ""}</div>

        <Swiper
          spaceBetween={0}
          navigation={true}
          thumbs={{ swiper: zoomSliderBig }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {value && value.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="item">
                  <InnerImageZoom
                    zoomType="hover"
                    zoomScale={1}
                    className=""
                    src={item}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <Swiper
        onSwiper={setzoomSliderBig}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="zoomSlider mb-2"
      >
        {value && value.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="item">
                <img src={item} className="w-100" alt="" />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default ProductZoom;
