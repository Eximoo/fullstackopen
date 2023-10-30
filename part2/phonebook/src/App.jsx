/* eslint-disable react/prop-types */
import { useState } from 'react';
const Entry = ({ person }) => {
  return (
    <>
      <p key={person.name}>{person.name}</p>
    </>
  );
};
const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');
  const addPerson = (e) => {
    e.preventDefault();
    if(persons.find((value) => value.name === newName)) {
      alert(`${newName} is already in Phonebook`)
      return;
    }
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  };
  const handleOnChange = (e) => {
    setNewName(e.target.value);
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleOnChange} />
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
