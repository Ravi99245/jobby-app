import {Component} from 'react'

import Header from '../Header'

import './index.css'

const apiStatusText = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AllJobsSection extends Component {
  state = {
    employmetType: '',
    slaryRange: '',
    apiStatus: apiStatusText.initial,
    jobsList: [],
    searchInput: '',
  }

  render() {
    return (
      <div className="all-jobs-section">
        <Header />
      </div>
    )
  }
}

export default AllJobsSection
