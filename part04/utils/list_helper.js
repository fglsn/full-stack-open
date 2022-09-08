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
		const total = blogs.reduce((sum, obj) => {
			return sum + obj.likes
		}, 0)
		console.log(total)
		return (total)
		
	}
}

module.exports = {
	dummy,
	totalLikes
}