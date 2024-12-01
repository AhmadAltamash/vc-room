'use client'
import { useUser } from '@clerk/nextjs';
import React from 'react'

const Table = ({ title, description }: {title: string; description: string}) => (
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>{title}:</h1>    
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>{description}:</h1>    
  </div>
)

const PersonalRoom = () => {

  const { user } = useUser()

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>Personal Room</h1>


      <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
        <Table title='Topic' description={`${user?.username?.toUpperCase()}'s Meeting Room`}/>
      </div>
    </section>
  )
}

export default PersonalRoom
