import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiStatusText = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileCard extends Component {
  state = {
    profileImage: '',
    name: '',
    bio: '',
    apiStatus: apiStatusText.initial,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusText.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const profileData = data.profile_details
      this.setState({
        profileImage: profileData.profile_image_url,
        name: profileData.name,
        bio: profileData.short_bio,
        apiStatus: apiStatusText.success,
      })
    } else {
      this.setState({apiStatus: apiStatusText.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderCard = () => {
    const {profileImage, name, bio} = this.state
    return (
      <div className="card-container">
        <img src={profileImage} alt="profile" className="profile-image" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-description">{bio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="retry-container">
      <button
        className="retry-button"
        type="button"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProfileCard = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusText.success:
        return this.renderCard()
      case apiStatusText.failure:
        return this.renderFailureView()
      case apiStatusText.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderProfileCard()}</>
  }
}

export default ProfileCard
