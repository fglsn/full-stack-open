import Button from "./Button"
import '../index.css'

const Blog = ({ blog }) => {

	return (
		<div class='blogStyle'>
			<div>{blog.title}</div>
			<div>{blog.url}</div>
			<div>likes {blog.likes} <Button text='like'></Button></div>
			<div>{blog.author}</div>
		</div>
	)
}
export default Blog