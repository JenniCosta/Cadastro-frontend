import React from 'react'

import { ErrorMessage, Formik, Form, Field } from 'formik'
import { TextField, Grid, Paper, FormControlLabel, Button, Link, Container, CssBaseline, Typography, Checkbox, Box, IconButton } from '@material-ui/core'
import * as yup from 'yup'
import axios from 'axios'
import { history } from '../../history'
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Logo from '../../images/logo.png'
import Fundo from './../../images/fundo.jpg'

import './Login.css'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent:'center',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  

const Login = () => {
    const classes = useStyles();

    const handleSubmit = values => {
        axios.post('http://localhost:8080/v1/api/auth', values)
            .then(resp => {
                const { data } = resp
                if (data) {
                    localStorage.setItem('app-token', data)
                    history.push('/')
                }
            })
    }

    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required()
    })
    return (
        <div className='full'>
        <div className="field">
            <div className="Login">
                <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} item xs={12}>
                    <img alt='' src={Logo} className="Logo"/>
                </Grid>

            <Grid item xs={12}>
            <Formik
                initialValues={{}}
                onSubmit={handleSubmit}
                validationSchema={validations}
            >
                <Form>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" style={{size: '5px'}}>
          Insira suas informações 
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <IconButton
            aria-label="toggle password visibility"
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
          >
            {values.showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton> */}
          
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={`${classes.submit} botao`}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              {/* <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container>
                </Form>
            </Formik>
            </Grid>
            </div>
        </div>
        </div>
    ) 
}

export default Login
