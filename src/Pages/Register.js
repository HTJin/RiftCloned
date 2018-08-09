import React, { Component } from 'react'

import { NameField, nameValidator } from './Data/NameField'
import { IgnField, ignValidator } from './Data/IgnField'
import { EmailField, emailValidator } from './Data/EmailField'

import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepContent from '@material-ui/core/StepContent'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'

import lolPittLogo from '../../src/assets/newestPittLogo.png'
import RedoIcon from 'mdi-material-ui/RedoVariant'
import ResetIcon from '@material-ui/icons/Clear'
import SendIcon from '@material-ui/icons/Send'
import NameIcon from '@material-ui/icons/AccountCircle'
import IgnIcon from 'mdi-material-ui/GamepadVariant'
import EmailIcon from 'mdi-material-ui/Email'

import './Pages.css'

class Register extends Component {
  state = {
    activeStep: 0,
    name: '',
    NameHelperText: 'Your first and last name here',
    ign: '',
    IGNHelperText: 'Your IGN is at least 3 characters',
    email: '',
    EmailHelperText: 'Preferred Email',
    inputError: false,
    nextForm: false,
    reviewForm: false
  }

  constructor(props) {
    super(props)
    this.nameValidator = nameValidator.bind(this)
    this.ignValidator = ignValidator.bind(this)
    this.emailValidator = emailValidator.bind(this)
  }

  handleNext = (ev) => {
    ev.preventDefault()
    if (!this.state.inputError && this.state.nextForm) {
      if (this.state.reviewForm) {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
          nextForm: true
        }))
      } else {
        this.setState(state => ({
          activeStep: state.activeStep + 1,
          nextForm: false
        }))
      }
    }
  }

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      nextForm: true
    }))
  }

  handleField = inputType => event => {
    switch (inputType) {
      case 'name':
        this.nameValidator(event)
        break
      case 'ign':
        this.ignValidator(event)
        break
      case 'email':
        this.emailValidator(event)
        break
      default:
        return null
    }
  }

  handleReview = () => {
    this.setState(state => ({
      activeStep: 0,
      nextForm: true
    }))
  }

  handleReset = () => {
    this.setState(state => ({
      activeStep: 0,
      name: '',
      ign: '',
      email: '',
      inputError: false,
      nextForm: false,
      reviewForm: false
    }))
  }



  render() {
    const steps = [
      'Tell us your name!',
      'What is your summoner name?',
      'What is your email address?'
    ]
    const { activeStep } = this.state

    return (
      <div className='registerDisplay'>
        <div className='main'>
          <img src={lolPittLogo} alt='lol@Pitt Logo' />
        </div>
        <div className='registrationSteps'>
          <Stepper activeStep={activeStep} orientation='vertical'>
            {steps.map((label, index) => {
              let inner = {}
              let userInfo = {}
              switch (index) {
                case 0:
                  inner = (
                    <NameField
                      handleChange={this.handleField('name')}
                      name={this.state.name}
                      helperText={this.state.NameHelperText}
                      nextStep={this.handleNext}
                      inputError={this.state.inputError}
                      nextForm={this.state.nextForm}
                    />
                  )
                  userInfo.optional = <div className='userInfo'><NameIcon className='fieldIcon' />{this.state.name}</div>
                  break;
                case 1:
                  inner = (
                    <IgnField
                      handleChange={this.handleField('ign')}
                      ign={this.state.ign}
                      helperText={this.state.IGNHelperText}
                      nextStep={this.handleNext}
                      prevStep={this.handleBack}
                      inputError={this.state.inputError}
                      nextForm={this.state.nextForm}
                    />
                  )
                  userInfo.optional = <div className='userInfo'><IgnIcon className='fieldIcon' />{this.state.ign}</div>
                  break;
                case 2:
                  inner = (
                    <EmailField
                      handleChange={this.handleField('email')}
                      email={this.state.email}
                      helperText={this.state.EmailHelperText}
                      nextStep={this.handleNext}
                      prevStep={this.handleBack}
                      inputError={this.state.inputError}
                      nextForm={this.state.nextForm}
                    />
                  )
                  userInfo.optional = <div className='userInfo'><EmailIcon className='fieldIcon' />{this.state.email}</div>
                  break;
                default:
                  return 'Something went wrong with your registration D:'
              }
              return (
                <Step key={label}>
                  <StepLabel {...userInfo}>{label}</StepLabel>
                  <StepContent>
                    {inner}
                  </StepContent>
                </Step>
              )
            })}
          </Stepper>
        </div>
        {activeStep === steps.length && (
          <Paper square elevation={0} className='CompletionDisplay'>
            <div>
              <div className='textInfo'>Successfully completed -</div>
              <div className='textInfo'>Click to send your confirmation email!</div>
              <Button
                onClick={this.handleReview}
                color='secondary'
              >
                <RedoIcon className='redoIcon' />
                <span className='buttonLabel'>Edit Information</span>
              </Button>
              <Button
                onClick={this.handleReset}
                color='secondary'
              >
                <span className='buttonLabel'>Reset</span>
                <ResetIcon className='resetIcon' />
              </Button>
              <Button
                className='sendEmail'
                onClick={this.handleReview}
                color='primary'
                variant='extendedFab'
              >
                <span className='buttonLabel'>Send Email</span>
                <SendIcon className='sendIcon' />
              </Button>
            </div>
          </Paper>
        )}
      </div>
    )
  }
}

export default Register
