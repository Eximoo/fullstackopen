/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import personServices from './services/persons';
const Entry = ({ person, handleEntryRemoval }) => {
  return (
    <>
      <p key={person.name}>
        {person.name} {person.number}{' '}
        <button id={person.id} onClick={handleEntryRemoval}>
          delete
        </button>
      </p>
    </>
  );
};
const Notification = ({ notiMsg }) => {
  if (notiMsg == null) {
    return;
  } else {
    return <div className="notification">{notiMsg}</div>;
  }
};
const Filter = ({ newFilter, handle }) => {
  return (
    <div>
      filter shown with:
      <input id="filter" value={newFilter} onChange={handle} />
    </div>
  );
};
const AddNewEntry = ({ addPerson, newName, handleOnChange, newNumber }) => {
  return (
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
  );
};

const ShowEntries = ({ persons, newFilter, handleEntryRemoval }) => {
  return persons
    .filter((value) =>
      value.name.toLowerCase().includes(newFilter.toLowerCase())
    )
    .map((value) => (
      <Entry
        key={value.name}
        person={value}
        handleEntryRemoval={handleEntryRemoval}
      />
    ));
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notiMsg, setNotiMsg] = useState('');

  useEffect(() => {
    personServices.getAll().then((response) => setPersons(response.data));
  }, []);

  const addPerson = (e) => {
    e.preventDefault();
    if (
      persons.find(
        (value) => value.name.toLowerCase() === newName.toLowerCase()
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to database, do you want to update the number?`
        )
      ) {
        const toUpdate = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        setPersons(
          persons.map((person) =>
            person.id == toUpdate.id ? { ...person, number: newNumber } : person
          )
        );
        pushNoti(`${newName}'s number was updated to ${newNumber}`);
      } else {
        return;
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personServices.create(newPerson).then((val) =>
        setPersons(
          persons.concat({
            name: val.data.name,
            number: val.data.number,
            id: val.data.id,
          })
        )
      );
      pushNoti(`${newName} was added`);
    }
    setNewName('');
    setNewNumber('');
  };
  const pushNoti = (noti) => {
    setNotiMsg(noti);
    setTimeout(() => setNotiMsg(null), 5000);
  };
  const handleOnChange = (e) => {
    e.target.id === 'name'
      ? setNewName(e.target.value)
      : setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value);
  };
  const handleEntryRemoval = (event) => {
    if (
      window.confirm(
        `Do you really wish to remove ${
          persons.find((person) => person.id == event.target.id).name
        }`
      )
    ) {
      personServices.remove(event.target.id);
      setPersons(persons.filter((person) => person.id != event.target.id));
    } else {
      return;
    }
  };
  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notiMsg={notiMsg} />
      <Filter newFilter={newFilter} handle={handleFilterChange} />
      <h1>Add new</h1>
      <AddNewEntry
        addPerson={addPerson}
        newName={newName}
        handleOnChange={handleOnChange}
        newNumber={newNumber}
      />

      <h1>Numbers</h1>
      <ShowEntries
        persons={persons}
        newFilter={newFilter}
        handleEntryRemoval={handleEntryRemoval}
      />
    </div>
  );
};

export default App;
