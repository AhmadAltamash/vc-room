import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
  return (
    <main className='relative w-screen'>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1'>
            <SignUp/>
        </div>
    </main>
  )
}

export default SignUpPage
