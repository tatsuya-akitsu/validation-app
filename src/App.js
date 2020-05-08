/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import useStyles from './styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

const app = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles()

  let initialState = {
    name: '',
    isNameValid: true,
    regName: /(ちんちん|おっぱい)/,
    email: '',
    isEmailValid: true,
    regEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    genders: [ '男性', '女性' ],
    gender: '',
    isGenderValid: true,
    content: '',
    isContentValid: true,
    privacyPolicy: false,
    isPrivacyValid: true,
  }

  const [state, setState] = useState(initialState)

  const handleSetName = e => {
    let name = e.target.value
    let isNameValid = null

    if (name.length === 0 || state.regName.test(name)) {
      isNameValid = true
    } else {
      isNameValid = false
    }
    setState(prevState => {
      return { ...prevState, name, isNameValid }
    })

  }

  const handleSetEmail = e => {
    let email = e.target.value
    let isEmailValid = null

    if (email.length === 0 || !email.match(state.regEmail)) {
      isEmailValid = true
    } else {
      isEmailValid = false
    }
    setState(prevState => {
      return { ...prevState, email, isEmailValid }
    })

  }

  const handleSetGender = e => {
    let gender = e.target.value
    let isGenderValid = null

    gender.lenth === 0 ? isGenderValid = true : isGenderValid = false
    setState(prevState => {
      return { ...prevState, gender, isGenderValid }
    })

  }

  const handleSetContent = e => {
    let content = e.target.value
    let isContentValid = null

    content.length === 0 ? isContentValid = true : isContentValid = false
    setState(prevState => {
      return { ...prevState, content, isContentValid }
    })

  }

  const handleCheckPrivacy = e => {
    let privacyPolicy = e.target.checked
    let isPrivacyValid = null
    privacyPolicy ? isPrivacyValid = false : isPrivacyValid = true
    setState(prevState => {
      return { ...prevState, privacyPolicy, isPrivacyValid }
    })
  }

  let { isNameValid, isEmailValid, isGenderValid, isContentValid, isPrivacyValid } = state

  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <header>
          <h2>お問い合わせ</h2>
        </header>
        <form>
          <TextField required id="standard-required" label="氏名" className={classes.formControl} fullWidth value={state.name} onChange={e => handleSetName(e)} error={state.isNameValid} />
          <TextField required id="standard-required" type="email" label="メールアドレス" className={classes.formControl} fullWidth value={state.email} onChange={e => handleSetEmail(e)} error={state.isEmailValid} />
          <FormControl required error={state.isGenderValid} className={classes.formControl}>
          <FormLabel component="legend">性別</FormLabel>
          <RadioGroup aria-label="性別" name="gender" value={state.gender} onChange={e => handleSetGender(e)}>
            {state.genders.map((item, index) => (
              <FormControlLabel value={item} control={<Radio />} label={item} key={index} />
            ))}
          </RadioGroup>
        </FormControl>
        <TextField
          required
          type="text"
          id="standard-multiline-static"
          label="内容"
          multiline
          rows="12"
          className={classes.formControl}
          fullWidth
          inputProps={{ maxLength: 200 }}
          value={state.content}
          onChange={e => handleSetContent(e)}
          error={state.isContentValid}
        />
        <FormControl required error={state.isPrivacyValid} className={classes.formControl}>
          <FormControlLabel
            control={
              <Checkbox
                value="同意する"
                checked={state.privacyPolicy}
                onChange={e => handleCheckPrivacy(e)}
                color="primary"
              />
            }
            label="プライバシーポリシーに同意する"
          />
        </FormControl>
        </form>
        <Button variant="contained" color="primary" disabled={[isNameValid, isEmailValid, isGenderValid, isContentValid, isPrivacyValid].filter(e => e).length === 0 ? false : true}>お問い合わせする</Button>
      </Container>
    </React.Fragment>
  )
}

export default app
