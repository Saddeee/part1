/**
const App = () => {
  const now = new Date()
  const a = 10;
  const b = 20;
  console.log(now, a+b)
/*
  return (
    <div>
      <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a+b}
      </p>
    </div>
  )
}

return (
  <div>
    <h1>Greetings</h1>
    <Hello/>
  </div>
  )

}

const Hello = ()  =>{
  return (
    <div>
    <p>Hello World</p>
    </div>
    )
  }
  
  const App = () => {
    return(
      <div>
      <h1>Greetings</h1>
      <Hello/>
      <Hello/>
      <Hello/>
      </div>
      )
    }
    */
    // const Hello = (props) => {
    //   console.log(props)
    //   return(
    //     <div>
    //       <p>
    //         Hello {props.name}, you are {props.age} years old
    //       </p>
    //     </div>
    //   )
    // }

    // const App = () => {
    //   const name = "Peter";
    //   const age = 10;

    //   return(
    //     <div>
    //       <h1>Greetings</h1>
    //       <Hello name = "May" age = {26+10} />
    //       <Hello name = {name} age = {age} />
    //     </div>
    //   )
    // }
    const App = () => {
      const now = new Date()
      const a =10 
      const b = 3
      const age = 10
      const name = "Gist"
      const friends = [
        { name: 'Peter', age: 4 },
        { name: 'Maya', age: 10 },
      ]
      console.log(now, a+b)
      //inside here is everything that is meant to be rendered
      return (
        <>
          <p>Hello world, it is {now.toString()}</p>
          <p>Hello world</p>
          <p>
            {a} + {b} is {a+b}
          </p>
          <h1>Greetings</h1>
          {/* <Hello name="HS" /> */}
          {/* <Hello name="dfadfS" /> */}
          {/* When jsx is used "{}" in between */}
          <Hello name={name} age={age}/>
          <Hello name="sfs" age={25+19}/>
          <p>{friends[0].name} {friends[0].age}</p>
          <p>{friends[1].name} {friends[1].age}</p>
        </>
      )
    }
    
    export default App

    const Hello = (props) => {
      console.log(props)
      return(
        <div> 
          <p>
            Hello {props.name}, you are {props.age} years old
          </p>
        </div>
      )
    }
  
