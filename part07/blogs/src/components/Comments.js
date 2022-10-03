const Comments = ({ comments }) => {
	return (
		<div>
			<h5>Comments</h5>
			<ul>
				{
					comments.map(comment => {
						return <li key={comment.id}>{comment.content}</li>
					})
				}
			</ul>
		</div>
	)
}

export default Comments