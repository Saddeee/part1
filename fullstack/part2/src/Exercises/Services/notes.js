import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const getAll = () => {
  const request = axios.get(baseUrl).catch((error) => {
    console.log("Fail getAll", error);
  });
  return request.then((response) => response.data);
};

const create = (newObj) => {
  const request = axios.post(baseUrl, newObj).catch((error) => {
    console.log("Fail create", error);
  });
  return request.then((response) => response.data);
};

const deleteName = (id) => {
  const request = axios.delete(baseUrl + "/" + id).catch((error) => {
    console.log("Fail deletanme", error);
  });
  return request.then((response) => response.data);
};

const update = (id,newObj)=>{
    const request = axios.put(baseUrl+"/"+id,newObj)
    return request.then(response=>response.data)
}

export default { getAll, create, deleteName, update };
