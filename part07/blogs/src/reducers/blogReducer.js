import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

//import { setNotification } from './notificationReducer'

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
		try {
			const newBlog = await blogService.create(newBlogObject)
			dispatch(appendBlog(newBlog))
		} catch (err) {
			console.log(err.response.data.error)
		}
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

export const comment = (blogs, id, commentObj) => {
	return async dispatch => {
		const blogToComment = blogs.find((blog) => blog.id === id)

		const newComment = await blogService.addComment(id, commentObj)
		const commentedBlog = {
			...blogToComment,
			comments: [newComment, ...blogToComment.comments]
		}
		const updatedList = blogs.map((blog) =>
			blog.id !== id ? blog : commentedBlog
		)
		dispatch(setBlogs(updatedList))
	}
}

export default blogSlice.reducer
