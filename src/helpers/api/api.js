import axios from "axios";

const instance = axios.create({
  baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1/",
});

export const getToken = async () => {
  try {
    const { data } = await instance.get("/token");
    instance.defaults.headers.token = data.token;
    console.log(data.token);

    return data.token;
  } catch (err) {
    console.log(err);
  }
};

export const getUsers = async (page) => {
  try {
    const params = new URLSearchParams({ count: 6, page });
    const { data } = await instance.get(`/users`, { params });
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserByID = async (id) => {
  try {
    const { data } = await instance.get(`/users/${id}`);
    return data.user;
  } catch (err) {
    console.log(err);
  }
};

export const getPositions = async () => {
  try {
    const { data } = await instance.get("/positions");
    return data.positions;
  } catch (err) {
    console.log(err);
  }
};

export const postUser = async (user) => {
  try {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    formData.append("photo", user.file);
    formData.append("position_id", user.position);
    const response = await instance.post("users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
