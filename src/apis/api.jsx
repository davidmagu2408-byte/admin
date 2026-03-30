import axios from "axios";

export const fetchDataFromAPI = async (url) => {
  try {
    const { data } = await axios.get(import.meta.env.VITE_API_URL + url, {
      withCredentials: true,
    });
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
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    console.log("error:", error);
    return error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await axios.delete(import.meta.env.VITE_API_URL + url, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const logout = async (url) => {
  try {
    const response = await axios.post(import.meta.env.VITE_API_URL + url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/category/${id}`,
      { withCredentials: true },
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
      { withCredentials: true },
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
      { withCredentials: true },
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
      { withCredentials: true },
    );
    console.log("response edit", response);
    return response.data;
  } catch (error) {
    return error;
  }
};
