const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {

	const blogsCount = blogs.length

	if (blogsCount === 0)
		return (0)
	else if (blogsCount === 1)
		return blogs[0].likes
	else {
		const total = blogs.reduce((sum, blog) => {
			return sum + blog.likes
		}, 0)
		// console.log(total)
		return (total)

	}
}

const favouriteBlog = (blogs) => {

	if (blogs.length === 0)
		return NaN
	else {
		const maxLikesValue = Math.max(...blogs.map(blog => blog.likes))

		const topBlog = blogs.filter(obj => {
			return obj.likes === maxLikesValue
		})

		const result = {
			title: topBlog[0].title,
			author: topBlog[0].author,
			likes: topBlog[0].likes
		}

		return result
	}

}

const mostBlogs = (blogs) => {
	// reduce array to an object that has authors as keys and "count objects (blogs)" as values
	// Then get final array with Object.values

	let authorsCounts = Object.values(blogs.reduce((r, { author }) => {
			r[author] = r[author] || { author, blogs: 0 };
			r[author].blogs++;
			return r;
		}, {})
	);

	let result =  authorsCounts.filter(obj => {
		return obj.blogs === Math.max(...authorsCounts.map(author => author.blogs))
	})

	return result[0]
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs
}