import { useState, useEffect } from "react";
import Filter from "./Componentss/Filter";
import PersonForm from "./Componentss/PeronForm";
import Persons from "./Componentss/Persons";
import noteService from "./Services/notes";
import Notification from "./Componentss/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setName] = useState("");
  const [newNumber, setNumber] = useState("");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("Add some names");
  const [goodorbad, setGoodOrBad] = useState(true);

  const hook = () => {
    noteService.getAll().then((getData) => {
      setPersons(getData);
    });
  };

  useEffect(hook, []);

  const handleNewName = (event) => {
    setName(event.target.value);
  };
  const handleNewNUmber = (event) => {
    setNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value.toLowerCase()); // Convert search to lowercase
  };
  const nameToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search)
  );

  const addName = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      if (
        window.confirm(
          newName +
            " already exists, do you whish to replace the number instead"
        )
      ) {
        const lookforperson = persons.find((person) => person.name === newName);
        const copyObj = { ...lookforperson, number: nameObject.number };
        noteService
          .update(lookforperson.id, copyObj)
          .then((data) => {
            setPersons(
              persons.map((person) =>
                person.name !== newName ? person : copyObj
              )
            );
          })
          .catch((error) => {
            setGoodOrBad(false)
            setMessage(copyObj.name + "is already removed");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
        setGoodOrBad(true)
        setMessage(
          "You have successfully updated " +
            copyObj.name +
            " number to " +
            copyObj.number
        );
        setTimeout(() => {
          setMessage(null);
        }, 6000);
      }
      return;
    }
    noteService
      .create(nameObject)
      .then((response) => {
        setPersons(persons.concat(response));
        setName("");
        setGoodOrBad(true)
        setMessage("Added " + nameObject.name + " successfully");
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      }).catch((error) => {
        setGoodOrBad(false)
        console.log('Error:', error.response);
        setMessage(error.response.data.error);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
  };

  const deletePerson = (id) => {
    if (window.confirm("Do you really want to delete")) {
      const lookforperson = persons.find((person) => person.id === id);
      setGoodOrBad(true)
      setMessage("You have delated " + lookforperson.name);

      noteService
        .deleteName(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((error) => {
          setGoodOrBad(false);
          setMessage(lookforperson.name + " is already removed");
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} goodorbad={goodorbad} />
      <Filter search={search} event={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm
        valueName={newName}
        valueNumber={newNumber}
        eventName={handleNewName}
        eventNumber={handleNewNUmber}
        submit={addName}
      />
      <h2>Numbers</h2>
      <Persons nameToShow={nameToShow} deletePerson={deletePerson} />

      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
