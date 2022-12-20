import React from 'react'

function Login() {
  return (
    <div className='formContainer'>
        <div className="formWrapper">
            <span className='logo'>Annon Chat</span>
            <span className='title'>Login</span>
            <form>
                <input type="email" placeholder='email'/>
                <input type="password" placeholder='password' />
                <button>Sign In</button>
            </form>
            <p>Don't have an account? Register</p>
        </div>
    </div>
  )
}

export default Login