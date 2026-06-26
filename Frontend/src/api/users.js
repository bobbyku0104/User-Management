import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-type": "application/json; charset=UTF-8",
  },
});

// Fetch all users
export const getUsers = async () => {
  const response = await apiClient.get("/users");
  return response.data;
};

// Fetch a single user by ID
export const getUserById = async (id) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

// Create a new user
export const createUser = async (userData) => {
  const response = await apiClient.post("/users", userData);
  return response.data;
};

// Update an existing user
export const updateUser = async (id, userData) => {
  const response = await apiClient.put(`/users/${id}`, userData);
  return response.data;
};

// Delete a user
export const deleteUser = async (id) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};
