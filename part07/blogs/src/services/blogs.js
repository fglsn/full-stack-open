import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (newObject) => {
	try {
		const config = {
			headers: { Authorization: token },
		}
		const response = await axios.post(baseUrl, newObject, config)
		return response.data
	} catch (err) {
		return err.response.data
	}
}

const remove = async (blogId) => {
	try {
		const config = {
			headers: { Authorization: token },
		}
		const response = await axios.delete(`${baseUrl}/${blogId}`, config)
		return response.data
	} catch (err) {
		return err.response.data
	}
}

const putLike = async (blogObject) => {
	const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
	return response.data
}

const moduleExports = { setToken, getAll, create, putLike, remove }
export default moduleExports
