/** part1.1
 * 
const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14
    
    return (
        <div>
        <Head name={course} />
        <Content part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
        />
        <Total n1 = {exercises1} n2 = {exercises2} n3 = {exercises3}/>
        </div>
        )
    }
    */

    /**
     * part1.3
     */
    const App = () => {
        const course = {
            name: 'Half Stack application development',
            parts: [
                {
                name: 'Fundamentals of React',
                exercises: 10
                },
                {
                name: 'Using props to pass data',
                exercises: 7
                },
                {
                name: 'State of a component',
                exercises: 14
                }
            ]
    }
      
        return (
        <div>
        <Head name={course.name} />
        <Content parts = {course.parts}/>
        <Total parts = {course.parts} />
        </div>
        )
      }

  export default App


//   Header, Content, and Total. All data still resides in the App component, which passes the necessary data to each component using props. 
// Header takes care of rendering the name of the course, 
// Content renders the parts and their number of exercises and 
//Total renders the total number of exercises.
const Head = ({name}) =>{
    console.log(name)
    return(    
        <div>
            <h1>
                {name}
            </h1>
        </div>
    )
}

const Content = ({parts}) =>{

    console.log(parts)
    return(
        <div>
            {parts.map((part, index)=> (
                <Part key = {index} part={part} exercises = {part}/>
            ))}
        </div>
        )
}

const Total =(props)=>{
    console.log(props)
    let totalExercises = 0;
    for (const part of props.parts) {
        totalExercises += part.exercises;
    }
    return (
        <div>
            <p>Number of exercises {totalExercises}</p>
        </div>
    );
}

const Part= (props)=>{
    console.log(props)
    return(
        <div>
            {props.part.name} {props.part.exercises}
        </div>
    )
}
