import Parts from "./Parts";

const Courses = ({ courses }) => {

    return(
        <div>
            {courses.map(
                course => (
                    <Course key = {course.id} course={course}/>
                )
            )}
        </div>
    )
}

const Course = ({course}) =>{
    const arrWithEx = course.parts.map((note) => note.exercises);
    const total = arrWithEx.reduce((acc, curr) => parseInt(acc) + parseInt(curr));
    
    return (
        <div>
        <h1>{course.name}</h1>
        {course.parts.map((note) => (
            <Parts key={note.id} name={note.name} exercise={note.exercises} />
            ))}
        <b>total of exercise {total}</b>
      </div>
    );
};

export default Courses;

//   function calcSum() {
//     let sum = 0;
//     course.parts.forEach((val) => {
//       sum += parseInt(val.exercises);
//     });
//     return sum;
//   }