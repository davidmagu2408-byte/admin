import { FaImages } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ImageUpload = ({
  images,
  previews,
  onImagesChange,
  onPreviewsChange,
}) => {
  const addImage = (e) => {
    const files = Array.from(e.target.files);
    onImagesChange([...images, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    onPreviewsChange([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    if (
      typeof previews[index] === "string" &&
      previews[index].startsWith("blob:")
    ) {
      URL.revokeObjectURL(previews[index]);
    }
    onPreviewsChange(previews.filter((_, i) => i !== index));
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="imagesUploadSec">
      <h5 className="mb-4">Media And Published</h5>
      <div className="imgUploadBox d-flex align-items-center">
        {previews.map((src, index) => (
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
    </div>
  );
};

export default ImageUpload;
