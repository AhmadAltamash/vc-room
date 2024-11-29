'use client'
import { useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = () => {
  const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)
  
  const call = useCall()

  useEffect(() => {
    if (isMicCamToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggledOn, call?.camera, call?.microphone]);
  
  
  

  return (
    <div className='h-screen w-full flex flex-col items-center justify-center gap-3 text-white'>
      <h1 className='text-2xl font-bold'>Setup</h1>
      <VideoPreview/>
    </div>
  )
}

export default MeetingSetup
// 'use client';
// import { useCall, VideoPreview } from '@stream-io/video-react-sdk';
// import React, { useEffect, useState } from 'react';

// const MeetingSetup = () => {
//   const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false);
//   const call = useCall();

//   useEffect(() => {
//     if (isMicCamToggledOn) {
//       call?.camera.enable()
//         .then(() => console.log('Camera enabled'))
//         .catch((error) => console.error('Failed to enable camera:', error));
//       call?.microphone.enable()
//         .then(() => console.log('Microphone enabled'))
//         .catch((error) => console.error('Failed to enable microphone:', error));
//     } else {
//       call?.camera.disable()
//         .then(() => console.log('Camera disabled'))
//         .catch((error) => console.error('Failed to disable camera:', error));
//       call?.microphone.disable()
//         .then(() => console.log('Microphone disabled'))
//         .catch((error) => console.error('Failed to disable microphone:', error));
//     }
//   }, [isMicCamToggledOn, call?.camera, call?.microphone]);

//   return (
//     <div className="h-screen w-full flex flex-col items-center justify-center gap-3 text-white">
//       <h1 className="text-2xl font-bold">Setup</h1>
//       <VideoPreview />
//       <button
//         className="btn"
//         onClick={() => setIsMicCamToggledOn((prev) => !prev)}
//       >
//         {isMicCamToggledOn ? 'Disable Mic/Cam' : 'Enable Mic/Cam'}
//       </button>
//     </div>
//   );
// };

// export default MeetingSetup;

