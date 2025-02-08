import { useState } from "react";
import { useDispatch } from "react-redux";
import { imgUploader } from "../services/cloudinary/img_uploading.service";

// Redux Actions
import { setToastMessage, setIsToatOpen } from "../redux/slices/ui.slice";

const ImageUploader = ({ formData, setFormData }) => {
  const dispatch = useDispatch();
  const [isImgUploading, setImgUploading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgUploading(true);
      const { success, message, url } = await imgUploader(e.target.files[0]);
      if (!success) {
        dispatch(setToastMessage(message));
        dispatch(setIsToatOpen(true));
        setImgUploading(false);
        return;
      }

      setImgUploading(false);
      setFormData({ ...formData, cover: url });
    }
  };

  return (
    <div className="mb-3">
      <label className="block mb-2 text-sm font-medium text-white">
        Upload Event Cover
      </label>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="imageUpload"
        onChange={handleImageChange}
      />
      {!formData?.cover && !isImgUploading && (
        <label
          htmlFor="imageUpload"
          className="cursor-pointer bg-gray-700 hover:bg-gray-800 text-white text-sm rounded-lg px-4 py-5 block text-center border-2 border-gray-500 border-dashed"
        >
          Upload Image
        </label>
      )}

      {!formData?.cover && isImgUploading && (
        <div className=" bg-gray-700 text-white text-sm rounded-lg px-4 py-5 block text-center border-2 border-gray-500 border-dashed">
          <div className="mx-auto w-8 h-8 border-4 border-white/40 border-t-blue-600 animate-spin rounded-full"></div>
        </div>
      )}
      {formData?.cover && (
        <img
          src={formData?.cover}
          alt="Preview"
          className="mt-2 rounded-lg w-full h-50 object-cover"
        />
      )}
    </div>
  );
};

export default ImageUploader;
