'use client'
import MeetingTypeList from '@/components/MeetingTypeList';
import React, { useEffect, useState } from 'react';

import { Call } from '@stream-io/video-react-sdk';
import { useGetCalls } from '../../../../hooks/useGetCalls';

const Home = () => {
  const { upcomingCalls } = useGetCalls();
  const [nextMeeting, setNextMeeting] = useState<Call | null>(null); // Adjusted the type to allow null
  
  useEffect(() => {
    if (upcomingCalls && upcomingCalls.length > 0) {
      // Sort upcoming calls by start time and select the first one
      const sortedUpcomingCalls = [...upcomingCalls].sort((a, b) => 
        new Date(a.state?.startsAt ?? 0).getTime() - new Date(b.state?.startsAt ?? 0).getTime()
      );
      setNextMeeting(sortedUpcomingCalls[0]);
    }
  }, [upcomingCalls]);

  const now = new Date();
  
  const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' })
    .replace('am', 'AM')
    .replace('pm', 'PM');
  
  const date = new Intl.DateTimeFormat('en-IN', { dateStyle: 'full', timeZone: 'Asia/Kolkata' }).format(now);

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
        <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
        <h2 className='glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>
          {nextMeeting ? 
            `Upcoming meeting at: ${new Date(nextMeeting.state?.startsAt ?? new Date()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' }).replace('am', 'AM').replace('pm', 'PM')}` 
            : 'No Upcoming Meeting'}
        </h2>

          
          <div className='flex flex-col gap-2'>
            <h1 className='text-4xl font-extrabold lg:text-7xl'>{time}</h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
          
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
