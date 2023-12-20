import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {cardDetails} = props
  const {
    companyLogoUrl,
    id,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = cardDetails

  return (
    <Link to={`/jobs/${id}`} className="link-job-item">
      <li className="job-item">
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
          <p className="salary">{packagePerAnnum}</p>
        </div>
        <hr className="line1" />
        <p className="description-heading">Description</p>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobCard
