const Notification = ({ message, goodorbad }) => {
  if (message === null) {
    return null;
  }
  const noteStyleGood = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  const noteStyleBad = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  return goodorbad ? <div style={noteStyleGood}>{message}</div>:<div style={noteStyleBad}>{message}</div> ;
};

export default Notification;
