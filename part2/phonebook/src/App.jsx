/* eslint-disable react/prop-types */
import { useState } from 'react';
const Entry = ({ person }) => {
  return (
    <>
      <p key={person.name}>{person.name} {person.number}</p>
    </>
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '1230-3232' },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.find((value) => value.name === newName)) {
      alert(`${newName} is already in Phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  };
  const handleOnChange = (e) => {
    e.target.id === 'name'
      ? setNewName(e.target.value)
      : setNewNumber(e.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input id="name" value={newName} onChange={handleOnChange} />
        </div>
        <div>
          number:{' '}
          <input id="number" value={newNumber} onChange={handleOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((value) => (
        <Entry key={value.name} person={value} />
      ))}
    </div>
  );
};

export default App;
