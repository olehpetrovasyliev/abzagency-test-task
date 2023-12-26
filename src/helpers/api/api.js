import axios from "axios";

const instance = axios.create({
  baseURL: "https://frontend-test-assignment-api.abz.agency/api/v1/",
});

export const getToken = async () => {
  try {
    const { data } = await instance.get("/token");
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    return data.token;
  } catch (err) {
    console.log(err);
  }
};

export const GetUsers = async () => {
  try {
    const { data } = await instance.get(`/users/${id}`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const GetUserByID = async (id) => {
  try {
    const { data } = await instance.get(`/users/${id}`);
    return data.user;
  } catch (err) {
    console.log(err);
  }
};

export const GetPositions = async () => {
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
    formData.append("photo", user.photo);
    formData.append("position", user.position);
    const response = await addPetInstance.post("users", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
