import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async (newObject) => {
	try {
		const response = await axios.post(baseUrl, newObject)
		return response.data
	} catch (err) {
		return err.response.data
	}
}

const moduleExports = { getAll, create }
export default moduleExports
