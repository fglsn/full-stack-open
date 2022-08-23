import { useState, useEffect } from 'react'
import axios from 'axios'
// import -- from './components/--'

const SearchField = ({search, handleSearch}) => <div>Find countries <input onChange={handleSearch} value={search}/></div>

const Countries = ({countriesToShow}) => {
	if (countriesToShow.length > 10)
		return <p>Too many matches, specify another filter</p>
	else if (countriesToShow.length === 1) {
		let countryToShow = countriesToShow[0];
		console.log(countryToShow)
		return (
			<CountryInfo key={countryToShow.id} country={countryToShow.country}/>
		)
	}
	else {
		return (
			<ul>
				{countriesToShow.map(country => 
					<CountryList key={country.id} country={country.country}/>
				)}
			</ul>
		)
	}
}

const CountryInfo = ({country}) => {

	let languages = Object.values(country.languages)
	// let flag = " flag"
	let alt = "Flag of " + country.name.common;
	return (
		<div>
			<h2>{country.name.common}</h2>
			<p>capital {country.capital}</p>
			<p>area {country.area}</p>
			<h4>languages: </h4>
			<ul>
				{languages.map(language => 
					<Language key={language} language={language}/>
				)}
			</ul>
			<img alt={alt} src={country.flags.png}/>
		</div>
	)
}

const CountryList = ({country}) => <li>{country.name.common}</li>

const Language = ({language}) => <li>{language}</li>

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

	let countriesList = []
	for (let i = 0; i < countries.length; i++) {
		countriesList.push({id: i, country: countries[i]})
	}

	// console.log(countriesList)

	let countriesToShow = [];

	if (search) {
		let searchMatches = countriesList.filter(country => (country.country.name.common.toLowerCase().includes(search.toLowerCase())))
		if (searchMatches.length)
			countriesToShow = searchMatches
		else
			countriesToShow = [];
	} else
		countriesToShow = []

	const handleSearch = (event) => setSearch(event.target.value)

	return (
		<div>
			<h1>Countries information</h1>
			<SearchField search={search} handleSearch={handleSearch}/>
			<Countries countriesToShow={countriesToShow}/>
		</div>
	)
}

export default App