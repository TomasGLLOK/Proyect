import axios from "axios"

const url = '/api/users'

const getAll = () => {
    return axios.get(url).then(response => response.data)
}

const createUser = ( newUser ) => {
    return axios.post(url, newUser).then(response => response.data)
}

const updateUSer = ( id, updatedUser ) => {
    return axios.put(`${url}/${id}`, updatedUser).then(response => response.data)
}

const deleteUser = ( id ) => {
    return axios.delete(`${url}/${id}`).then(response => response.data)
}


export default { getAll, createUser, deleteUser, updateUSer }