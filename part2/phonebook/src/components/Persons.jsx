import Person from './Person'

const Persons = (props) => {
    return (
        <div>{props.filteredPeople.map(person => <Person key={person.name} personObj={person} />)}</div>
    )
}

export default Persons
