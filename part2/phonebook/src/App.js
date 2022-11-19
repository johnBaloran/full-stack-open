import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "notes");

  const addName = (event) => {
    event.preventDefault();

    const found = persons.find((person) => person.name === newName);

    if (found) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");

      return;
    }
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
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
  return (
    <div>
      <h2>Phonebook</h2>
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
              </p>
            ))
          : persons.map((person) => (
              <p key={person.name}>
                {person.name} {person.number}
              </p>
            ))}
      </div>
    </div>
  );
};

export default App;
