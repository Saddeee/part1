{/* <PersonForm valueName = {newName} valueNumber={newNumber} eventName={handleNewName} eventNumber = {handleNewNUmber} submit = {addName}/> */}
const PersonForm = ({valueName, valueNumber, eventNumber, eventName, submit}) => {
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name : <input value={valueName} onChange={eventName} />
          <br />
          number : <input value={valueNumber} onChange={eventNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm
