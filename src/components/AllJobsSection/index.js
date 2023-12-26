import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import JobCard from '../JobCard'

import './index.css'

const apiStatusText = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    apiStatus: apiStatusText.initial,
    jobsList: [],
    searchInput: '',
    total: '',
  }

  componentDidMount() {
    this.getJobsList()
    this.setState({apiStatus: apiStatusText.inProgress})
  }

  getJobsList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, salaryRange, employmentType} = this.state
    const typeOfEmployment = employmentType.join()
    console.log(typeOfEmployment)
    const url = `https://apis.ccbp.in/jobs?employment_type=${typeOfEmployment}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        id: eachItem.id,
        employmentType: eachItem.employment_type,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(data)
      this.setState({
        jobsList: fetchedData,
        apiStatus: apiStatusText.success,
        total: data.total,
      })
    } else {
      this.setState({apiStatus: apiStatusText.failure})
    }
  }

  getFilteredJobs = () => {
    this.getJobsList()
    this.setState({apiStatus: apiStatusText.inProgress})
  }

  handleInputChange = event => {
    this.setState({searchInput: event.target.value})
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsView = () => {
    const {jobsList, total} = this.state

    const showJobsList = total > 0
    return showJobsList ? (
      <div className="cards-content">
        <ul className="job-cards">
          {jobsList.map(eachItem => (
            <JobCard key={eachItem.id} cardDetails={eachItem} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="jobs-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
          alt="no jobs"
          className="job-failure-image"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  updateSalaryRange = range => {
    this.setState(
      {salaryRange: range, apiStatus: apiStatusText.inProgress},
      this.getJobsList,
    )
  }

  updateEmploymentType = employment => {
    const {employmentType} = this.state
    if (!employmentType.includes(employment)) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, employment],
          apiStatus: apiStatusText.inProgress,
        }),
        this.getJobsList,
      )
    } else {
      const updateItems = employmentType.filter(
        eachItem => eachItem !== employment,
      )
      this.setState(
        {employmentType: updateItems, apiStatus: apiStatusText.inProgress},
        this.getJobsList,
      )
    }
  }

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-image"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="jobs-failure-retry-button"
        type="button"
        onClick={this.getFilteredJobs}
      >
        Retry
      </button>
    </div>
  )

  renderAllJobs = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusText.success:
        return this.renderJobsView()
      case apiStatusText.failure:
        return this.renderFailureView()
      case apiStatusText.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {employmentTypesList, salaryRangesList} = this.props
    return (
      <div className="all-jobs-section">
        <Header />
        <div className="jobs-container">
          <div className="mobile-input-container">
            <input
              className="input-element"
              type="search"
              onChange={this.handleInputChange}
              placeholder="Search"
            />
            <button
              className="search-button"
              type="button"
              data-testid="searchButton"
              aria-label="Search"
              onClick={this.getFilteredJobs}
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <div className="filters-group">
            <FiltersGroup
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
              updateSalaryRange={this.updateSalaryRange}
              updateEmploymentType={this.updateEmploymentType}
            />
          </div>
          <div className="job-card-container">
            <div className="input-container">
              <input
                className="input-element"
                type="search"
                onChange={this.handleInputChange}
                placeholder="Search"
              />
              <button
                className="search-button"
                type="button"
                data-testid="searchButton"
                aria-label="Search"
                onClick={this.getFilteredJobs}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default AllJobsSection
