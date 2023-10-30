/* eslint-disable react/prop-types */
import { useState } from 'react';
const Entry = ({ person }) => {
  return (
    <>
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    </>
  );
};
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

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
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with:{' '}
        <input id="filter" value={newFilter} onChange={handleFilterChange} />
        <div>debug: {newFilter}</div>
      </div>
      <h2>Add new</h2>
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
      {persons
        .filter((value) =>
          value.name.toLowerCase().includes(newFilter.toLowerCase())
        )
        .map((value) => (
          <Entry key={value.name} person={value} />
        ))}
    </div>
  );
};

export default App;
