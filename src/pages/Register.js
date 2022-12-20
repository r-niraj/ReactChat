import React from 'react'

function Register() {
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className='logo'>Annon Chat</span>
            <span className='title'>Register</span>
            <form>
                <input type="text" placeholder='display name'/>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password' />
                <input type="file" />
                <button>Sign up</button>
                <p>You do have an acacount? Login</p>
            </form>
        </div>
    </div>
  )
}

export default Register