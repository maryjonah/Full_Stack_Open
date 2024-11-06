const Course = ({ course }) => {
    return (
      <>
        <Header headerText={course.name} />
        <Content parts={course.parts} />
      </>
    )
  }
  
  const Header = ({ headerText }) => {
    return (
      <>
        <h1>{headerText}</h1>
      </>
    )
  }
  
  const Content = ({ parts }) => {
    return (
    <>
      {parts.map(part => <Part key={part.id} part={part} />)}
      <p><b>total of {parts.reduce( ( sum , cur ) => sum + cur.exercises , 0)} exercises</b></p>
    </>
    )
  }
  
  const Part = ({ part }) => {
    return <p>{ part.name } {part.exercises}</p>
  }
  

export default Course 