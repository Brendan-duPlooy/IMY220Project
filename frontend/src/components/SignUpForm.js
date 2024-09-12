import React from 'react';

class SignUpForm extends React.Component 
{
  render() 
  {
    return(
        <form>
            <h3>Enter the Details below: </h3>
            <label>Name <input required type="text" placeholder="Erica"/></label>
            <label>Email <input required type="email" placeholder="u12345678@tuks.co.za"/></label>
            <label>Password <input required type="password" placeholder="*********"/></label>
            <button type="submit">Register</button>
        </form>
    );
  }
}

export default SignUpForm;
