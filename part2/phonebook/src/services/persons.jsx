import axios from 'axios';

axios.defaults.baseURL = './api/persons';

const getAll = () => {
  return axios.get();
};

const create = (newObject) => {
  return axios.post('', newObject);
};

const update = (id, newObject) => {
  return axios.put(`/${id}`, newObject);
};
const remove = (id) => {
  return axios.delete(`/${id}`);
};

export default {
  getAll: getAll,
  create: create,
  update: update,
  remove: remove,
};
