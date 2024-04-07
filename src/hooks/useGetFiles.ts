import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { storage } from '..';

export const useGetFiles = (id: string | undefined): [Blob[], string[], boolean] => {
   const [files, setFiles] = useState<Blob[]>([]);
   const [names, setNames] = useState<string[]>([]);

   const [loading, setLoading] = useState(true);

   // Get files from database
   useEffect(() => {
      listAll(ref(storage, `${id ? id : ''}/`)).then((res) => {
         if (res.items.length === 0) setLoading(false);

         res.items.forEach((itemRef: any, ind) => {
            getDownloadURL(ref(storage, `${itemRef._location.path_}`)).then((url) => {
               const xhr = new XMLHttpRequest();
               xhr.responseType = 'blob';

               xhr.onload = () => {
                  const blob = xhr.response;
                  setFiles((prev) => [...prev, blob]);
                  setNames((prev) => [...prev, `${itemRef._location.path_.split('/')[1]}`]);
                  if (res.items.length - 1 === ind) {
                     setLoading(false);
                  }
               };

               xhr.open('GET', url);
               xhr.send();
            });
         });
      });
   }, [id]);

   return [files, names, loading];
};
