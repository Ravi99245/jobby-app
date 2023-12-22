import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {MdHome} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="logo-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="nav-logo"
            />
          </Link>
        </div>
        <div className="header-items-container">
          <ul className="nav-items">
            <li className="nav-item">
              <Link to="/" className="mobile-link-item">
                <MdHome className="icon" />
              </Link>
              <Link to="/" className="link-item">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="mobile-link-item">
                <BsBriefcaseFill className="icon" />
              </Link>
              <Link to="/jobs" className="link-item">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            Logout
          </button>
          <button
            aria-label="log-out"
            className="mobile-logout-button"
            type="button"
            onClick={onClickLogout}
          >
            <FiLogOut className="icon" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
