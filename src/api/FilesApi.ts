import { ref, uploadBytes } from 'firebase/storage';
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

   files.forEach(async (file) => {
      await uploadBytes(ref(storage, `${id}/${file.name}`), file);
   });

   setIsClicked(false);
};
