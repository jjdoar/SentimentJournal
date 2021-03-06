
// add useContext
import React, {useContext} from 'react';
import {firebaseAuth} from '../provider/AuthProvider';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, CardActions,
  TextField, Button, Grid } from "@material-ui/core";

const Signup = (props) => {

  const {handleSignup, inputs, setInputs, errors} = useContext(firebaseAuth)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    //wait to signup 
    await handleSignup()
    //push home
    props.history.push('/')
  }
  const handleChange = e => {
    const {name, value} = e.target
    setInputs(prev => ({...prev, [name]: value}))
  }
  
  const useStyles = makeStyles({
    button: {
      textTransform: 'none',
    }
  });

  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}><Grid item xs={3}>
        <Card>
          <CardHeader>
          {/* replace the div tags with a form tag */}
          Signup
          {/* make inputs  */}
          </CardHeader>
          <form onSubmit={handleSubmit}>
          <CardContent>
            <TextField onChange={handleChange} type="text" name="name" value={inputs.name}
              id="outlined-basic" label="Name" variant="outlined" size="small" />
          </CardContent>
          <CardContent>
            <TextField onChange={handleChange} type="text" name="email" value={inputs.email}
              id="outlined-basic" label="Email" variant="outlined" size="small" />
          </CardContent>
          <CardContent>
            <TextField onChange={handleChange} type="password" name="password" value={inputs.password}
              id="outlined-basic" label="Password" variant="outlined" size="small" />
          </CardContent>
          {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p>) : null}
          <CardActions>
            <Button type="submit" size="small" className={classes.button}
              variant="contained" color="primary">Sign Up
            </Button>
            <Link to="/signin">
              <Button size="small" className={classes.button}
                variant="contained" color="primary">Sign In</Button>
            </Link>
          </CardActions>
        </form>
      </Card>
    </Grid></Grid>
  );
};

export default withRouter(Signup);
