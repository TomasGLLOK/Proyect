const Filter = ({ filterName }) => {
    return (
      <div>
        <label>Filter users: </label>
        <input type='text' onChange={filterName} />
      </div>
    )
  }

export default Filter