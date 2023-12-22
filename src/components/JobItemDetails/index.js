import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'

import './index.css'

const apiStatusText = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'LOADING',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusText.initial,
    jobDetails: {},
    skills: [],
    similarJobs: [],
    lifeAtCompany: {},
  }

  componentDidMount() {
    this.getJobItemDetails()
    this.setState({apiStatus: apiStatusText.inProgress})
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const fetchedJobDetails = data.job_details
      const updatedJobDetails = {
        companyLogoUrl: fetchedJobDetails.company_logo_url,
        companyWebsiteUrl: fetchedJobDetails.company_website_url,
        employmentType: fetchedJobDetails.employment_type,
        id: fetchedJobDetails.id,
        jobDescription: fetchedJobDetails.job_description,
        location: fetchedJobDetails.location,
        packagePerAnnam: fetchedJobDetails.package_per_annum,
        rating: fetchedJobDetails.rating,
        title: fetchedJobDetails.title,
      }
      console.log(updatedJobDetails)
      const fetchedSkills = fetchedJobDetails.skills
      const updatedSkills = fetchedSkills.map(eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))
      console.log(updatedSkills)
      const fetchedLifeAtCompany = fetchedJobDetails.life_at_company
      const updatedLifeAtCompany = {
        description: fetchedLifeAtCompany.description,
        imageUrl: fetchedLifeAtCompany.image_url,
      }
      console.log(updatedLifeAtCompany)
      const fetchedSimilarJobs = data.similar_jobs
      const updatedSimilarJobs = fetchedSimilarJobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      console.log(updatedSimilarJobs)
      this.setState({
        jobDetails: updatedJobDetails,
        skills: updatedSkills,
        similarJobs: updatedSimilarJobs,
        lifeAtCompany: updatedLifeAtCompany,
        apiStatus: apiStatusText.success,
      })
    } else {
      this.setState({apiStatus: apiStatusText.failure})
    }
  }

  renderJobItemDetails = () => {
    const {jobDetails, skills, similarJobs, lifeAtCompany} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnam,
      rating,
      title,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <>
        <div className="individual-job-card">
          <div className="company-header">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="company logo"
            />
            <div className="title-rating-container">
              <p className="titleName">{title}</p>
              <div className="rating-container">
                <FaStar className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="location-and-employment-container">
              <div className="location-container">
                <MdLocationOn className="icon" />
                <p className="location">{location}</p>
              </div>
              <div className="location-container">
                <BsBriefcaseFill className="icon" />
                <p className="location">{employmentType}</p>
              </div>
            </div>
            <p className="salary">{packagePerAnnam}</p>
          </div>
          <hr className="line1" />
          <div className="description-container">
            <p className="description-heading">Description</p>
            <button className="anchor-button" type="button">
              <a
                href={companyWebsiteUrl}
                className="anchor-element"
                target="_self"
              >
                Visit
                <FaExternalLinkAlt className="link-icon" />
              </a>
            </button>
          </div>
          <p className="job-description">{jobDescription}</p>
          <div className="skill-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skill-items">
              {skills.map(eachItem => (
                <li className="skill-list-item">
                  <img
                    src={eachItem.imageUrl}
                    className="skill-image"
                    alt={eachItem.name}
                  />
                  <p className="skill-name">{eachItem.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="skills-heading">Life at Company</h1>
            <div className="life-description-company-image-container">
              <p className="company-description">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="company-image"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-heading">Similar Jobs</h1>
        <div className="similar-job-container">
          {similarJobs.map(eachItem => (
            <SimilarJobCard key={eachItem.id} similarJob={eachItem} />
          ))}
        </div>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSingleJobItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusText.success:
        return this.renderJobItemDetails()
      case apiStatusText.inProgress:
        return this.renderLoadingView()
      case apiStatusText.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-container">
        <div className="header-container">
          <Header />
        </div>
        <div className="job-content-container">
          {this.renderSingleJobItemDetails()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
