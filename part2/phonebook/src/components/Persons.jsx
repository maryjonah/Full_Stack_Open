import Person from './Person'

const Persons = (props) => {
    return (
        <div>
            {props.filteredPeople.map(person => <Person key={person.name} personObj={person} btnDelete={props.btnDelete}/>)}
        </div>
    )
}

export default Persons
