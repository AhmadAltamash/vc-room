'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/hooks/use-toast"


const MeetingTypeList = () => {

    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()

    const [value, setValue] = useState({
        dateTime: new Date(),
        description: '',
        link:''
    })

    const [callDetails, setCallDetails] = useState<Call>()
    const { toast } = useToast()

    const router = useRouter()

    const {user} = useUser();
    const client = useStreamVideoClient()

    const createMeeting = async () => {
        if(!client || !user) return;

        try {

            if(!value.dateTime){
                toast({ title: "Please Select a date and time" })
                return
            }

            const id = crypto.randomUUID();
            const call = client.call('default', id)

            if(!call) throw new Error('failed to create call')

            const startsAt = value.dateTime.toISOString() || new Date(Date.now()).toISOString();

            const description = value.description || 'Instant meeting';

            await call.getOrCreate({
                data: {
                  starts_at: startsAt,
                  custom:{
                    description
                  }  
                }
            })

            setCallDetails(call)

            if(!value.description){
                router.push(`/meeting/${call.id}`)
            }

            toast({ title: "Meeting Created" })
        } catch (error) {
            console.log(error);
            toast({ title: "Failed To Create Meeting" })
        }
    }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>

        <HomeCard
            img='/icons/add-meeting.svg'
            title='New Meeting'
            desc='Start an instant meeting'
            className='bg-orange-1'
            handleClick={() => setMeetingState('isInstantMeeting')}
        />
        <HomeCard
            img='/icons/join-meeting.svg'
            title='Join Meeting'
            desc='via invitation link'
            className='bg-blue-1'
            handleClick={() => setMeetingState('isJoiningMeeting')}
        />
        <HomeCard
            img='/icons/schedule.svg'
            title='Schedule Meeting'
            desc='Plan your meeting'
            className='bg-purple-1'
            handleClick={() => setMeetingState('isScheduleMeeting')}
        />
        <HomeCard
            img='/icons/recordings.svg'
            title='Recordings'
            desc='Meeting Recordings'
            className='bg-yellow-1'
            handleClick={() => router.push('/recordings')}
        />

        <MeetingModal
            className='text-center'
            isOpen={meetingState === 'isInstantMeeting'}
            onClose={() => setMeetingState(undefined)}
            title='Start an Instant Meeting'
            buttonText='Start Meeting'
            handleClick={createMeeting}
        />
    </section>
  )
}

export default MeetingTypeList
