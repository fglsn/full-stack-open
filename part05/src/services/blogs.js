import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then(response => response.data)
}

const create = async newObject => {
	try {
		const config = {
			headers: { Authorization: token },
		}
	
		const response = await axios.post(baseUrl, newObject, config)
		return response.data
	} catch (err) {
		return(err.response.data)
	}

}

const putLike =  async (blogObject) => {
	const response = await axios.put(`${baseUrl}/${blogObject.id}`, blogObject)
	return response.data
}

const moduleExports = { setToken, getAll, create, putLike }
export default moduleExports