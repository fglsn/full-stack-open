import { useState, useEffect } from 'react'
import axios from 'axios'
// import -- from './components/--'

const SearchField = ({ search, handleSearch }) => <div>Find countries <input onChange={handleSearch} value={search}/></div>

const Countries = ({ countries, setSearch }) => {
	if (countries.length > 10)
		return <p>Too many matches, specify another filter</p>
	else if (countries.length === 1)
		return <CountryView country={countries[0]}/>
	else {
		return (
			<ul>
				{countries.map((country, i) => 
					<CountryName key={i} country={country} setSearch={setSearch}/>
				)}
			</ul>
		)
	}
}

const CountryView = ({ country }) => {
	let name = country.name.common
	let languages = Object.values(country.languages)
	let description = `Flag of ${name}`;

	const [weather, setWeather] = useState([])
	const [error, setError] = useState()

	const hook = () => {
		console.log('effect')
		axios
			.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
			.then(response => {
				console.log('promise fulfilled')
				console.log(response.data)
				setWeather(response.data)
			})
			.catch(setError)
	}
	useEffect(hook, [country.capital])

	console.log("Weather ", weather)
	console.log("error ", error)

	return (
		<div>
			<h2>{name}</h2>
			<p>Capital: {country.capital}</p>
			<p>Area: {country.area}</p>
			<h4>languages: </h4>
			<div>
				{languages.map(language => 
					<Language key={language} language={language}/>
				)}
			</div>
			<img alt={description} title={description} src={country.flags.png}/>
			<h3>Weather in {country.capital}</h3>
			{/* { weather && weather.main && weather.main.temp && weather.wind && weather.wind.speed } ?  */}
			{weather.length !== 0 ? 
				( <div>
					<p>Temperature {Math.floor(weather.main.temp)}°C</p>
					<img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`Weather condition in ${country.capital}`}/>
					<p>Wind {weather.wind.speed} m/s</p>
				 </div> )
				: ( <p>loading weather</p> )
			}
		</div>
	)
}

const CountryName = ({ country, setSearch }) => <li>{country.name.common} <button onClick={() => setSearch(country.name.common)}>show</button></li>

const Language = ({ language }) => <li>{language}</li>

const App = () => {
	const [countries, setCountries] = useState([])
	const [search, setSearch] = useState('')

	const hook = () => {
		console.log('effect')
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				console.log('promise fulfilled')
				setCountries(response.data)
			})
	}

	useEffect(hook, [])

	console.log("Initial fetched list: ", countries)

	let countriesToShow = [];

	if (search === '')
		countriesToShow = []
	else
		countriesToShow = countries.filter(country => (country.name.common.toLowerCase().includes(search.toLowerCase())))

	const handleSearch = (event) => setSearch(event.target.value)

	return (
		<div>
			<h1>Countries information</h1>
			<SearchField search={search} handleSearch={handleSearch}/>
			<Countries countries={countriesToShow} setSearch={setSearch}/>
		</div>
	)
}

export default App