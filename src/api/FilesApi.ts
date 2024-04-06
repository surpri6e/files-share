import { ref, uploadBytes } from 'firebase/storage';
import { throwError } from '../utils/throwError';
import { storage } from '..';

export const deleteFile = (name: string, files: File[], setFiles: React.Dispatch<React.SetStateAction<File[]>>) => {
   setFiles(files.filter((file) => file.name !== name));
};

export const uploadToServer = async (
   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
   files: File[],
   setIsClicked: React.Dispatch<React.SetStateAction<boolean>>,
   id: string,
) => {
   e.preventDefault();

   files.forEach((file) => {
      uploadBytes(ref(storage, `${id}/${file.name}`), file)
         .then(() => setIsClicked(false))
         .catch((err: unknown) => {
            throwError(err);
         });
   });
};
