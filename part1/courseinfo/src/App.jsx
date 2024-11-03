const Header = (props) => {
  return (
    <div>
      <h1>{props.headerText}</h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <>
        <Part partText={props.parts[0].name} exerciseNo={props.parts[0].exercises} />
        <Part partText={props.parts[1].name} exerciseNo={props.parts[1].exercises} />
        <Part partText={props.parts[2].name} exerciseNo={props.parts[2].exercises} />
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.partText} {props.exerciseNo}</p>
    </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
  )
}


const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {name: 'Fundamentals of React', exercises: 10},
      {name: 'Using props to pass data', exercises: 7},
      {name: 'State of a component', exercises: 14}
    ]
  }

  return (
    <div>
      <Header headerText={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
