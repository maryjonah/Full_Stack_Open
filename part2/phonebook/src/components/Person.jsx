const Person = ({ personObj, btnDelete }) => {
    return (
      <>
        <p>
          {personObj.name} {personObj.number} &nbsp;
          <button onClick={() => btnDelete(personObj.id)}>delete</button>
        </p>
      </>
    )
  }

  export default Person
  