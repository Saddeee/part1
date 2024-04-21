import { useState } from "react"

const App1 = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
    const [select, setSelected] = useState(0)
    const [votes, setVotes]= useState(Array(anecdotes.length).fill(0))
    const [max, setMax]= useState(0)
    const setToSelected=()=>{
      const ran = Math.floor(Math.random()* (anecdotes.length));
      setSelected(ran)
    }
    const setPicked=()=>{
      picked=true;
    }

    const handlevotes=()=>{
      const newArr = [...votes]
      newArr[select]+=1
      if (newArr[select] > newArr[max]) {
        setMax(select);
      }
    
      setVotes(newArr);
    }
    return(
      <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[select]}</p>
      <p>Has {votes[select]} votes</p>
      <Button event = {setToSelected} text = "next Anectod"/>
      <Button event = {handlevotes} text = "Vote"/>

      <h2>Anecdote with most love</h2>
      <p>{anecdotes[max]}</p>
      </div>
    )
  }

  export default App1

  const Button =({event, text})=>{
    return(
      <button onClick={event}>
        {text}
      </button>
    )
  }


