const mongoose = require('mongoose')


if (process.argv.length < 3) {
	console.log('Please provide the password as an arguments: node mongo.js <password> optional parameters: <contact name> <contact number>')
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fglsn:${password}@cluster0.rxxdbit.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = new mongoose.Schema({
	// "id": Number,
	'name': String,
	'number': String,
})

const Person = mongoose.model('Person', personSchema)
if (process.argv.length === 3) {
	mongoose
		.connect(url)
		.then((result) => {
			console.log('connected')
			console.log('phonebook: ')
			Person.find({}).then(result => {
				result.forEach(person => {
					console.log(`${person.name}: ${person.number}`)
				})
				mongoose.connection.close()
			})
		})
		.catch((err) => console.log(err))
} else if (process.argv.length > 3 && process.argv[3] && process.argv[4]) {
	const name = process.argv[3]
	const number = process.argv[4]

	mongoose
		.connect(url)
		.then((result) => {
			console.log('connected')
			const person = new Person({ name, number })
			return person.save()
		})
		.then(() => {
			console.log(`Added ${name} number ${number} to phonebook`)
			return mongoose.connection.close()
		})
		.catch((err) => console.log(err))
} else {
	console.log('Please provide the password as an argument to see full contact list: node mongo.js <password>. Or password and two optional parameters to add new contact: node mongo.js <password> <contact name> <contact number>')
	process.exit(1)
}


