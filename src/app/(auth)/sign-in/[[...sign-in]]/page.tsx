import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='relative w-screen'>
        <div className='absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-24'>
            <SignIn/>
        </div>
    </main>
  )
}

export default SignInPage
