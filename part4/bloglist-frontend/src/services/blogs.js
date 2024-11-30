import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

// Adds the work Bearer to the start of the token
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (id, updateObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, updateObject)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }
