import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import {createTheme, ThemeProvider} from '@mui/material/styles'
import * as Yup from 'yup'
import axios from 'axios'
import Swal from 'sweetalert2'
import {useFormik} from 'formik'
import {makeStyles} from 'tss-react/mui'
import {useNavigate, NavLink} from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const theme = createTheme()
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

const validationSchema = Yup.object({
  fname: Yup.string().required('Required'),
  lname: Yup.string().required('Required'),
  password: Yup.string()
    .matches(passwordRules, {
      message:
        'Please create a stronger password (min 8 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit)'
    })
    .required('Required'),
  email: Yup.string().email('Please enter a valid email').required('Required')
})

const useStyles = makeStyles()((theme) => ({
  root: {
    [theme.breakpoints.up('md')]: {
      width: '30%'
    },
    [theme.breakpoints.down('md')]: {
      width: '60%'
    },
    [theme.breakpoints.down('sm')]: {
      width: '95%'
    },
    margin: '0 auto',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '30px',
    marginRight: '30%'
  },
  formControl: {
    marginTop: '10px'
  },
  submitBtn: {
    marginTop: '75px',
    marginLeft: '15%'
  },
  signup: {
    marginRight: '80%'
  }
}))

// const imageUpload = (event)=>{
//   console.log(event.target.files[0])
// }

export default function SignUp() {
  const navigate = useNavigate()
  const {classes} = useStyles()

  const formik = useFormik({
    initialValues: {
      fname: '',
      lname: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      console.log('here')

      axios({
        method: 'POST',
        url: 'http://localhost:3000/account/sendOTP',
        data: { email: values.email },
      });
      Swal.fire({
        title: 'Enter OTP',
        input: 'text',
        inputLabel: '',
        inputPlaceholder: 'Enter otp',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        preConfirm: otp => {
          return axios
            .post('http://localhost:3000/account/verifyOTP', { values, otp })
            .then(response => {
              return response.data;
            })
            .catch(error => {
              Swal.fire({
                title: 'Mismatched OTP',
                icon: 'question',
                iconHtml: '?',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Back'
              })
            });
        },
      })
      await axios({
        method: 'POST',
        url: 'http://localhost:3000/account/createAccount',
        data: {
          fname: values.fname,
          lname: values.lname,
          email: values.email,
          password: values.password,
        }
      })
        .then(() => {
          console.log('Customer added')
          navigate('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  })

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const {handleChange, handleSubmit} = formik

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="fname"
                  name="fname"
                  label="First Name"
                  type="text"
                  autoComplete="off"
                  value={formik.values.fname}
                  placeholder="Enter First name"
                  onChange={handleChange}
                  error={
                    formik.errors['fname'] && formik.touched.fname
                      ? true
                      : false
                  }
                  helperText={
                    formik.errors['fname'] && formik.touched.fname
                      ? formik.errors['fname']
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="lname"
                  name="lname"
                  label="Last Name"
                  type="text"
                  autoComplete="off"
                  value={formik.values.lname}
                  placeholder="Enter last Name"
                  error={
                    formik.errors['lname'] && formik.touched.lname
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  helperText={
                    formik.errors['lname'] && formik.touched.lname
                      ? formik.errors['lname']
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="email"
                  type="text"
                  value={formik.values.email}
                  placeholder="Enter Email "
                  error={
                    formik.errors['email'] && formik.touched.email
                      ? true
                      : false
                  }
                  onChange={handleChange}
                  helperText={
                    formik.errors['email'] && formik.touched.email
                      ? formik.errors['email']
                      : null
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  error={
                    formik.errors['password'] && formik.touched.password
                      ? true
                      : false
                  }
                  placeholder="Enter password"
                  onChange={handleChange}
                  helperText={
                    formik.errors['password'] && formik.touched.password
                      ? formik.errors['password']
                      : null
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              margintop="16px"
              variant="contained"
              sx={{mt: 3, mb: 2}}
              style={{
                backgroundColor: '#006ee6'
              }}
            >
              Get OTP
            </Button>
          </Box>

          <Grid container justifyContent="flex-end">
            <Grid item marginTop="16px" marginBottom="60px">
              <NavLink to="/login">Already have an account? Sign in</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
