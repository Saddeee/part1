const Persons = ({ nameToShow, deletePerson }) => {
  return (
    <div>
      {nameToShow.map((person) => (
        <div key={person.id}>
          {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
