
// add useContext
import React, {useContext} from 'react';
import { Link } from "react-router-dom";
import {firebaseAuth} from '../provider/AuthProvider';
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent, CardActions,
  TextField, Button, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const Signin = () => {

  const {handleSignin, inputs, setInputs, errors} = useContext(firebaseAuth)
  
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSignin()
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
      style={{ minHeight: '100vh' }}>
      <Grid item xs={3}>
    <Card>
      <CardHeader>
        {/* replace the div tags with a form tag */}
        Sign In
        {/* make inputs  */}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <TextField onChange={handleChange} type="text" name="email" value={inputs.email}
            id="outlined-basic" label="Email" variant="outlined" size="small" />
        </CardContent>
        <CardContent>
          <TextField onChange={handleChange} type="password" name="password" value={inputs.password}
            id="outlined-basic" label="Password" variant="outlined" size="small" />
        </CardContent>
        <CardContent>
          {errors.length > 0 ? errors.map(error =>
	    <Alert severity="error">{error}</Alert>) : null}
        </CardContent>
        <CardActions>
          <Button type="submit" size="small" className={classes.button}
            variant="contained" color="primary">Log In</Button>
          <Link to="/signup">
            <Button size="small" className={classes.button}
	      variant="contained" color="primary">Sign Up</Button>
          </Link>
	</CardActions>
      </form>
    </Card>
    </Grid></Grid>
  );
};

export default Signin;
