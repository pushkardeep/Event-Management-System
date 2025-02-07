// methods
import { request } from "../../utils/axios";

// limitations
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const imgUploader = async (file) => {
  if (!file) {
    return { success: false, message: "Please select a valid image file" };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      message: "Invalid file type. Only JPG, PNG, and JPEG are allowed.",
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      message: "File size exceeds the 5MB limit.",
    };
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_IMAGES_UPLOAD_PRESET);

  try {
    const response = await request(
      formData,
      "https://api.cloudinary.com",
      "POST",
      `v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`
    );

    if (response.success === false) {
      return { success: false, message: "Upload failed, try again" };
    }

    return { success: true, url: response.secure_url };
  } catch (error) {
    return {
      success: false,
      message: error.message || "Something went wrong",
    };
  }
};
