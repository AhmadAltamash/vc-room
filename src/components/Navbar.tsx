import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='fixed z-50 flex w-full items-center justify-between bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-1'>
        <Image 
          src='/icons/logo.svg'
          width={32}
          height={32}
          alt='Room Logo'
          className='max-sm:size-10'
        />
        <p className='max:sm:hidden text-[26px] font-extrabold text-white'>VC - ROOM</p>
      </Link>

      <div className='signInBtn flex items-center justify-between gap-5'>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>



        <MobileNav/>

      </div>

    </nav>
  )
}

export default Navbar
