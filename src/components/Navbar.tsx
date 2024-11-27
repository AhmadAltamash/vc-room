import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { ClerkProvider, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <nav className='flex justify-between items-center fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10'>
      <Link href='/' className='flex items-center gap-1'>
        <Image 
          src='/icons/logo.svg'
          width={32}
          height={32}
          alt='Room Logo'
          className='max-sm:size-10'
        />
        <p className='text-[26px] font-extrabold text-white max:sm:hidden'>VC - ROOM</p>
      </Link>

      <div className='flex-between gap-5'>
        <ClerkProvider>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
        </ClerkProvider>
        <MobileNav/>

      </div>

    </nav>
  )
}

export default Navbar
