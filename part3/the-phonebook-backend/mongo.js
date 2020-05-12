const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2];

const url = `mongodb+srv://fullstack-oaugusto:${password}@cluster0-gsg4v.mongodb.net/the-phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const Person = mongoose.model('person', personSchema)

switch (process.argv.length) {
  case 3:
    Person.find({}).then(result => {
      result.forEach(person => {
        console.log(person)
      })
      mongoose.connection.close()
    });
    break;
  case 5:
    const person = new Person({
      name: process.argv[3],
      phone: process.argv[4],
    });

    person.save().then(response => {
      console.log('person saved!')
      mongoose.connection.close()
    })
    break;
  default:
    console.log('please provide the correct args');
    break;
}