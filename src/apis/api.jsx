import axios from "axios";

export const fetchDataFromAPI = async (url) => {
  try {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + url);
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const postData = async (url, formData) => {
  try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + url,
      formData,
    );
    return response.data;
  } catch (error) {
    console.log("error:", error);
    return error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await axios.delete(import.meta.env.VITE_API_URL + url);
    return response;
  } catch (error) {
    return error;
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/category/${id}`,
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const editCategory = async (id, formData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/category/edit/${id}`,
      formData,
    );
    console.log("response edit", response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/product/${id}`,
    );
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const editProduct = async (id, formData) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/product/${id}`,
      formData,
    );
    console.log("response edit", response);
    return response.data;
  } catch (error) {
    return error;
  }
};
