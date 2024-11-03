const Header = (props) => {
  return (
    <div>
      <h1>{props.headerText}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <>
        <Part partText={props.part1} exerciseNo={props.exercises1} />
        <Part partText={props.part2} exerciseNo={props.exercises2} />
        <Part partText={props.part3} exerciseNo={props.exercises3} />
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
    <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
  )
}


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
      <Header headerText={course} />
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
      <Total ex1={exercises1} ex2={exercises2} ex3={exercises3} />
    </div>
  )
}

export default App
