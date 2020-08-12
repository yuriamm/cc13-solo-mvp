import Axios from "axios";

class DataService {
  async getAll() {
    let res = await Axios.get("/api/questions");
    return res.data;
  }

  async get(id) {
    let res = await Axios.get(`/api/questions/${id}`);
    return res.data;
  }

  async create(data) {
    let res = await Axios.post("/add", data);
    return res.data;
  }

  async update(id, data) {
    let res = await Axios.put(`/questions/${id}`, data);
    return res.data;
  }

  async deleteOne(id) {
    await Axios.delete(`/questions/${id}`);
  }

  async findByKeyword(keyword) {
    let res = await Axios.get(`/api/questions?keyword=${keyword}`);
    return res.data;
  }
}

export default new DataService();
