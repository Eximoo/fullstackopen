import { set, connect, Schema, model, connection } from 'mongoose';
import { process } from 'dotenv';

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://eximo:${password}@fso.hgyq2o6.mongodb.net/noteApp?retryWrites=true&w=majority`;

set('strictQuery', false);
connect(url);

const personSchema = new Schema({
  name: String,
  number: String,
});

const Person = model('Person', personSchema);

if (process.argv.length < 4) {
  Person.find({}).then((persons) => {
    console.log('phonebook:');
    persons.forEach((person) => {
      console.log(person.name, person.number);
    });
    connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  });
  person.save().then(() => {
    console.log(
      `added ${process.argv[3]} number ${process.argv[4]} to phonebook`
    );
    connection.close();
  });
}
