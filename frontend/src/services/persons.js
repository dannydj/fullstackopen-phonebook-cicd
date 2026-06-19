import axios from 'axios'

const BASE_URL = '/api/persons'

const getAll = () => {
  return axios.get(BASE_URL).then(response => {
    const { data } = response
    return data
  })
}

const create = newPerson => {
  return axios.post(BASE_URL, newPerson).then(response => {
    return response.data
  })
}

const deleteById = id => {
  return axios.delete(`${BASE_URL}/${id}`)
}

const update = person => {
  return axios.put(`${BASE_URL}/${person.id}`, person).then(response => response.data)
}

export default { getAll, create, deleteById, update }
