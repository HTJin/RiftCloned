import React from 'react'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

import validator from 'validator'

import BackIcon from '@material-ui/icons/ExpandLess'
import NextIcon from '@material-ui/icons/ExpandMore'

import '../Pages.css'


export function ignValidator (event) {
  const defaultHelperText = [
    'Your IGN is at least 3 characters',
    'Looks good!'
  ]
  this.setState({
    ign: event.target.value
  }, () => {
    if (this.state.ign === '' || this.state.ign.length < 3) {
      this.setState(state =>
        ({ IGNHelperText: defaultHelperText[1], inputError: false }))
    }
    if (this.state.ign.length > 16) {
      this.setState(state =>
        ({ IGNHelperText: 'Your IGN is longer than 16 characters', inputError: true }))
    }
    if (!validator.matches(this.state.ign, /^[a-z0-9 ]+$/i) && this.state.ign !== '') {
      this.setState(state =>
        ({ IGNHelperText: 'Your IGN contains invalid character(s)', inputError: true }))
    }
    if (this.state.ign.length >= 3 && this.state.ign.length <= 16 && validator.matches(this.state.ign, /^[a-z0-9 ]+$/i)) {
      this.setState(state =>
        ({ IGNHelperText: defaultHelperText[1], inputError: false }))
    }
  })
}

export const IgnField = (props) => {
    return (
      <div>
        <form onSubmit={props.handleSubmit}>
          <TextField
            error={props.inputError}
            label='Summoner Name'
            placeholder='Imaqtpie'
            helperText={props.helperText}
            value={props.ign}
            onChange={props.handleChange}
            fullWidth
          />
        </form>
        <div className='actionsContainer'>
          <Button color='secondary' onClick={props.prevStep}>
            <BackIcon />
            <span className='buttonLabel'>Back</span>
          </Button>
          <Button
            variant='contained'
            color='primary'
            onClick={props.nextStep}
            disabled={
              props.ign === '' ||
              props.ign.length < 3 ||
              props.ign.length > 16 ||
              !validator.matches(props.ign, /^[a-z0-9 ]+$/i)
            }
          >
            <span className='buttonLabel'>Next</span>
            <NextIcon />
          </Button>
        </div>
      </div>
    )
  }