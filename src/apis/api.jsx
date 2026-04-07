import api from "./axiosConfig";

export const fetchDataFromAPI = async (url) => {
  try {
    const { data } = await api.get(url);
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const postData = async (url, formData) => {
  try {
    const response = await api.post(url, formData);
    return response.data;
  } catch (error) {
    console.log("error:", error);
    return error;
  }
};

export const deleteData = async (url) => {
  try {
    const response = await api.delete(url);
    return response;
  } catch (error) {
    return error;
  }
};

export const logout = async (url) => {
  try {
    const response = await api.post(url);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchCategoryById = async (id) => {
  try {
    const { data } = await api.get(`/category/${id}`);
    return data;
  } catch (error) {
    return error;
  }
};

export const editCategory = async (id, formData) => {
  try {
    const response = await api.put(`/category/edit/${id}`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchProductById = async (id) => {
  try {
    const { data } = await api.get(`/product/${id}`);
    return data;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const editProduct = async (id, formData) => {
  try {
    const response = await api.put(`/product/${id}`, formData);
    return response.data;
  } catch (error) {
    return error;
  }
};
