'use client';
import { useRouter } from 'next/navigation';
import { useGetCalls } from '../../hooks/useGetCalls';
import { CallRecording } from '@stream-io/node-sdk';
import { useEffect, useState } from 'react';
import { Call } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
import Loader from './Loader';
import { useToast } from '@/hooks/use-toast';

// Define a unified type for CallRecording
interface UnifiedCallRecording {
  filename: string;
  start_time: Date;
  end_time: Date;
  url: string;
  uniqueId: string; // Added for mapping unique IDs
}

const CallList = ({ type }: { type: 'ended' | 'upcoming' | 'recordings' }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { endedCalls, upcomingCalls, callRecordings, isLoading } =
    useGetCalls();
  const [recordings, setRecordings] = useState<UnifiedCallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'No Previous Calls';
      case 'upcoming':
        return 'No Upcoming Calls';
      case 'recordings':
        return 'No Recordings';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings?.map((meeting) => meeting.queryRecordings()) ?? []
        );

        const normalizedRecordings: UnifiedCallRecording[] = callData
          .filter((call) => call.recordings.length > 0)
          .flatMap((call) =>
            call.recordings.map((recording) => ({
              filename: recording.filename,
              start_time: new Date(recording.start_time), // Normalize to Date
              end_time: new Date(recording.end_time), // Normalize to Date
              url: recording.url,
              uniqueId: `${recording.filename}-${recording.start_time}`, // Generate unique ID
            }))
          );

        setRecordings(normalizedRecordings);
      } catch (error) {
        console.error(error);
        toast({ title: 'Try Again Later' });
      }
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings, toast]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | UnifiedCallRecording, index: number) => (
          <MeetingCard
            key={
              (meeting as Call).id ||
              (meeting as UnifiedCallRecording).uniqueId ||
              index
            }
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                ? '/icons/upcoming.svg'
                : '/icons/recordings.svg'
            }
            title={
              (meeting as Call).state?.custom?.description ||
              (meeting as UnifiedCallRecording).filename?.substring(0, 20) ||
              'Personal Meeting'
            }
            date={
              (meeting as Call).state?.startsAt?.toLocaleString() ||
              (meeting as UnifiedCallRecording).start_time?.toLocaleString()
            }
            isPreviousMeeting={type === 'ended'}
            link={
              type === 'recordings'
                ? (meeting as UnifiedCallRecording).url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonIcon={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as UnifiedCallRecording).url}`)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
          />
        ))
      ) : (
        <h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
