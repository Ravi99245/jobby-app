import ProfileCard from '../ProfileCard'
import './index.css'

const FiltersGroup = props => {
  const {
    salaryRangesList,
    employmentTypesList,
    updateSalaryRange,
    updateEmploymentType,
  } = props

  const handleOptionChange = event => {
    updateSalaryRange(event.target.value)
  }

  const handleEmploymentChange = event => {
    updateEmploymentType(event.target.value)
    console.log(event.target.value)
  }

  return (
    <>
      <div className="profile-container">
        <div className="card-content">
          <ProfileCard />
        </div>
        <hr className="line" />
        <div className="employment-container">
          <h1 className="employment-type">Type of Employment</h1>
          <ul className="employment-list">
            {employmentTypesList.map(eachItem => (
              <li className="employment-item" key={eachItem.label}>
                <input
                  type="checkbox"
                  className="checkbox"
                  id={`checkbox ${eachItem.label}`}
                  onChange={handleEmploymentChange}
                  value={eachItem.employmentTypeId}
                />
                <label
                  className="employment"
                  htmlFor={`checkbox ${eachItem.label}`}
                >
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr className="line" />
        <div className="employment-container">
          <h1 className="employment-type">Salary Range</h1>
          <ul className="employment-list">
            {salaryRangesList.map(eachItem => (
              <li className="employment-item" key={eachItem.label}>
                <input
                  type="radio"
                  id={`salary${eachItem.label}`}
                  value={eachItem.salaryRangeId}
                  name="salary"
                  className="checkbox"
                  onChange={handleOptionChange}
                />
                <label
                  className="employment"
                  htmlFor={`salary${eachItem.label}`}
                >
                  {eachItem.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default FiltersGroup
