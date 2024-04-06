import { useEffect, useState } from 'react';

export const useIsMobileDevice = () => {
   const [isMobileDevice, setIsMobileDevice] = useState(false);

   useEffect(() => {
      setIsMobileDevice(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent));
   }, []);

   return isMobileDevice;
};
