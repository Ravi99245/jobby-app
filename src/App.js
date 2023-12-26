import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import AllJobsSection from './components/AllJobsSection'
import JobItemDetails from './components/JobItemDetails'
import NotFound from './components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    isSelected: false,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    isSelected: false,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    isSelected: false,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    isSelected: false,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/jobs"
      component={() => (
        <AllJobsSection
          salaryRangesList={salaryRangesList}
          employmentTypesList={employmentTypesList}
        />
      )}
    />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route component={NotFound} />
  </Switch>
)

export default App
