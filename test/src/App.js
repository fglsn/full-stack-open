import { useState } from 'react'

// const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

// const Display = ({counter}) => <div>{counter}</div>

// const App = () => {
// 	const [ counter, setCounter ] = useState(50)
  
// 	const increaseByOne = () => setCounter(counter + 1)
// 	const decreaseByOne = () => setCounter(counter - 1)

// 	const setToZero = () => setCounter(0)
  
// 	return (
// 	  <div>
// 		<Display counter={counter}/>
// 		<Button
//         onClick={increaseByOne}
//         text='plus'
//       />
//       <Button
//         onClick={setToZero}
//         text='zero'
//       />     
//       <Button
//         onClick={decreaseByOne}
//         text='minus'
//       />  
// 	  </div>
// 	)
//   }

// // Complex state part https://fullstackopen.com/en/part1/a_more_complex_state_debugging_react_apps#complex-state
// const App = () => {
// 	const [clicks, setClicks] = useState({
// 	  left: 0, right: 0
// 	})
  
// 	const handleLeftClick = () => {
// 	  setClicks({...clicks, left: clicks.left + 1})
// 	}

// 	const handleRightClick = () => {
// 	  setClicks({...clicks, right: clicks.right + 1})
// 	}
  
// 	return (
// 	  <div>
// 		{clicks.left}
// 		<button onClick={handleLeftClick}>left</button>
// 		<button onClick={handleRightClick}>right</button>
// 		{clicks.right}
// 	  </div>
// 	)
//	}

const History = (props) => {
	if (props.allClicks.length === 0) {
		return (
			<div>
				press btn
			</div>
		)
	}
	return (
		<div>
			pressed btn history: {props.allClicks.join(' ')}
		</div>
	)
}

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
	  {text}
	</button>
  )

const App = () => {
	const [left, setLeft] = useState(0)
	const [right, setRight] = useState(0)
	const [allClicks, setAll] = useState([])

	const handleLeftClick = () => {
		setAll(allClicks.concat('L'))
		setLeft(left + 1)
	}

	const handleRightClick = () => {
		setAll(allClicks.concat('R'))
		setRight(right + 1)
	}
	return (
		<div>
		  {left}
		  <Button handleClick={handleLeftClick} text='left'/>
		  <Button handleClick={handleRightClick} text='right'/>
		  {right}
		  <History allClicks={allClicks}/>
		</div>
	  )
}
export default App;
