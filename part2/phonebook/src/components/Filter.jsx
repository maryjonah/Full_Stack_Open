const Filter = ({filterTerm, handleFilter }) => {
    return (
        <div>
            filter shown with: <input value={filterTerm} onChange={handleFilter} />
        </div>
    )
}

export default Filter