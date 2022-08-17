import { useState } from 'react'

const Button = ({handleClick, text}) => 
	<button onClick={handleClick}>
		{text}
	</button>

const StatisticLine = ({text, value}) => 
	<tr>
		<td>{text}</td>
		<td>{value}</td>
	</tr>

const Statistics = ({good, neutral, bad, average}) => {
	let total = good + bad + neutral
	if (total === 0)
		return <div>No feedback given</div>

	let avg = 0
	let pos = 0
	if (total > 0) {
		avg = average / total
		pos = 100 / total * good + '%'
	}

	return (
		<table>
			<tbody>
				<StatisticLine text='good' value={good}/>
				<StatisticLine text='neutral' value={neutral}/>
				<StatisticLine text='bad' value={bad}/>
				<StatisticLine text='all' value={total}/>
				<StatisticLine text='average' value={avg}/>
				<StatisticLine text='positive' value={pos}/>
			</tbody>
		</table>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const [average, setAverage] = useState(0)

	const handleGood = () => {
		setGood(good + 1)
		setAverage(average + 1)
	}

	const handleNeutral = () => {
		setNeutral(neutral + 1)
	}

	const handleBad = () => {
		setBad(bad + 1)
		setAverage(average - 1)
	}

	return (
		<div>
			<h3>Give Feedback</h3>
			<Button handleClick={handleGood} text='good' />
			<Button handleClick={handleNeutral} text='neutral' />
			<Button handleClick={handleBad} text='bad' />

			<h3>Statistics</h3>
			<Statistics good={good} neutral={neutral} bad={bad} average={average}/>
		</div>
	)
}

export default App