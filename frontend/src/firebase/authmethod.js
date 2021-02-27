import firebaseconfig from './firebaseIndex'
import firebase from 'firebase'
import axios from "axios";

export const authMethods = {
  // firebase helper methods go here... 
  signup: (email, password, name, setErrors, setToken, setInputs) => {
    firebase.auth().createUserWithEmailAndPassword(email,password) 
      //make res asynchonous so that we can make grab the token before saving it.
      .then( async res => {
        axios({
          method: "PUT",
          url: "http://0.0.0.0:8081/v0/journal_entries",
          data: {
            userId: res.user.uid,
	    name: name
          },
        }).catch(err => {
	   setErrors(console.log(err.message))
	});

	setInputs({ uid: res.user.uid })

        const token = await Object.entries(res.user)[5][1].b
        //set token to localStorage 
        await localStorage.setItem('token', token)
        setToken(token)
        //grab token from local storage and set to state. 
          console.log(res)
        })
        .catch(err => {
        setErrors(prev => ([...prev, err.message]))
      })
    },
  signin: (email, password, setErrors, setToken, setInputs) => {
    //change from create users to...
    firebase.auth().signInWithEmailAndPassword(email, password) 
      //everything is almost exactly the same as the function above
      .then( async res => {
	axios({
		method: "GET",
		url: "http://0.0.0.0:8081/v0/journal_entries",
		params: {
			userId: res.user.uid,
		},
	}).then(response => {
		for (let user in response.data) {
			setInputs({ 
				uid: response.data["0"]["0"],
				name: response.data["0"]["1"] 
			}) 
		}
	});

        const token = await Object.entries(res.user)[5][1].b
          //set token to localStorage 
          await localStorage.setItem('token', token)
          
          
          setToken(window.localStorage.token)
        })
        .catch(err => {
          setErrors(prev => ([...prev, err.message]))
        })
      },
      //no need for email and password
      signout: (setErrors, setToken) => {
      // signOut is a no argument function
    firebase.auth().signOut().then( res => {
      //remove the token
      localStorage.removeItem('token')
        //set the token back to original state
        setToken(null)
    })
    .catch(err => {
      //there shouldn't every be an error from firebase but just in case
      setErrors(prev => ([...prev, err.message]))
      //whether firebase does the trick or not i want my user to do there thing.
        localStorage.removeItem('token')
          setToken(null)
            console.error(err.message)
    })
    },
  }
