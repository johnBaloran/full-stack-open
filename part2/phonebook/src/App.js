import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();

    const found = persons.find((person) => person.name === newName);
    const changedNumber = { ...found, number: newNumber };

    if (found) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService.update(found.id, changedNumber).then((response) => {
          console.log(response);
          setPersons(
            persons.map((person) =>
              person.id !== found.id ? person : response
            )
          );
        });
      }

      setNewName("");
      setNewNumber("");

      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    personService.create(nameObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    });
  };

  const filteredPersons = persons.filter((person) => person.name === newFilter);

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value);
  };

  const handleDeleteNumber = (id) => {
    personService
      .deleteNumber(id)
      .then((initialNotes) => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(
          `Information of ${
            persons.find((person) => person.id === id).name
          } has already been removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <div>
        filter shown with <input value={newFilter} onChange={handleNewFilter} />
      </div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.length > 0
          ? filteredPersons.map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
                <button onClick={() => handleDeleteNumber(person.id)}>
                  delete
                </button>
              </p>
            ))
          : persons.map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
                <button onClick={() => handleDeleteNumber(person.id)}>
                  delete
                </button>
              </p>
            ))}
      </div>
    </div>
  );
};

export default App;
