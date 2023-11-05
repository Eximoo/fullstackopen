import axios from 'axios';

axios.defaults.baseURL = './api/persons';

const getAll = () => {
  return axios.get();
};

const create = (newObject) => {
  return axios.put('', newObject);
};

const update = (id, newObject) => {
  console.log(id, newObject, 'inside of update');
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
