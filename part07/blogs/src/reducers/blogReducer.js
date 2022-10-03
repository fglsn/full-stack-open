import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		appendBlog(state, action) {
			state.push(action.payload)
		},
		setBlogs(state, action) {
			return action.payload.sort((a, b) => b.likes - a.likes)
		},
	},
})

export const { appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogService.getAll()
		dispatch(setBlogs(blogs))
	}
}

export const createBlog = newBlogObject => {
	return async dispatch => {
		const newBlog = await blogService.create(newBlogObject)
		dispatch(appendBlog(newBlog))
	}
}


export const like = (blogs, id) => {
	const putLikeTo = blogs.find((blog) => blog.id === id)
	const likedBlog = {
		...putLikeTo,
		likes: putLikeTo.likes + 1,
	}
	return async dispatch => {
		await blogService.putLike(likedBlog)
		const updatedList = blogs.map((blog) =>
			blog.id !== id ? blog : likedBlog
		)
		dispatch(setBlogs(updatedList))
	}
}

export const comment = (blogs, blogId, commentObj) => {
	return async dispatch => {
		await blogService.addComment(blogId, commentObj)
		dispatch(setBlogs(blogs))
	}
}

export default blogSlice.reducer
