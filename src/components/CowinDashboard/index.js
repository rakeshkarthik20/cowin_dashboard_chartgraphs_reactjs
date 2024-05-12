// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationByAge from '../VaccinationByAge/index'
import VaccinationByGender from '../VaccinationByGender/index'
import VaccinationCoverage from '../VaccinationCoverage/index'

import './index.css'

const apiConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class CowinDashboard extends Component {
  state = {
    vaccinationCov: {},
    apiStatus: apiConstant.initial,
  }

  componentDidMount() {
    this.getDetails()
  }

  getDetails = async () => {
    this.setState({apiStatus: apiConstant.loading})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(vaccinationDataApiUrl)
    if (response.ok) {
      const data = await response.json()

      const updatedVaccination = {
        last7DaysVaccination: data.last_7_days_vaccination.map(each => ({
          vaccineDate: each.vaccine_date,
          dose1: each.dose_1,
          dose2: each.dose_2,
        })),
        vaccinationByAge: data.vaccination_by_age.map(each => ({
          age: each.age,
          count: each.count,
        })),
        vaccinationByGender: data.vaccination_by_gender.map(each => ({
          gender: each.gender,
          count: each.count,
        })),
      }

      console.log('successful')

      this.setState({
        vaccinationCov: updatedVaccination,
        apiStatus: apiConstant.success,
      })
    } else {
      this.setState({apiStatus: apiConstant.failure})
      console.log('failure.....')
    }
  }

  renderLoadingView = () => {
    console.log('loading view')
    return (
      <div data-testid="loader" className="loader-class">
        <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
      </div>
    )
  }

  renderVaccinationStats = () => {
    const {vaccinationCov} = this.state

    return (
      <>
        <VaccinationCoverage data={vaccinationCov.last7DaysVaccination} />
        <VaccinationByGender data={vaccinationCov.vaccinationByGender} />
        <VaccinationByAge data={vaccinationCov.vaccinationByAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something went wrong</h1>
    </div>
  )

  renderResult = () => {
    const {apiStatus, vaccinationCov} = this.state

    console.log(vaccinationCov, apiStatus)

    switch (apiStatus) {
      case apiConstant.success:
        return this.renderVaccinationStats()
      case apiConstant.failure:
        return this.renderFailureView()
      case apiConstant.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-main-container">
        <div className="cowin-sub-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="logo-image"
            />
            <h1 className="logo-heading">Co-WIN</h1>
          </div>
          <h1 className="cowin-main-heading">CoWIN Vaccination in India</h1>
          {this.renderResult()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
