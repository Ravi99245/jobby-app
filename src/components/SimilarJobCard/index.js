import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobCard = props => {
  const {similarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob
  return (
    <div className="similar-job-content">
      <div className="logo-and-title-container">
        <img
          src={companyLogoUrl}
          className="similar-job-logo"
          alt="similar job company logo"
        />
        <div className="title-and-rating-container">
          <h1 className="title-heading">{title}</h1>
          <div className="rating-container">
            <FaStar className="star" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similarJob-description-title">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>
      <div className="location-and-employmentType-container">
        <div className="location-container">
          <MdLocationOn className="icon" />
          <p className="location">{location}</p>
        </div>
        <div className="location-container">
          <BsBriefcaseFill className="icon" />
          <p className="location">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobCard
