import React from 'react';

interface IDragAndDrop {
   drag: boolean;
   setDrag: React.Dispatch<React.SetStateAction<boolean>>;
   setFiles: React.Dispatch<React.SetStateAction<File[]>>;
   files: File[];
}

const DragAndDrop: React.FC<IDragAndDrop> = ({ drag, setDrag, setFiles, files }) => {
   const dragStart = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDrag(true);
   };

   const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDrag(false);
   };

   // When files will be uploaded
   const dragDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();

      // If name alredy exist in files
      const condition: boolean = files.map((el) => el.name).includes(e.dataTransfer.files[0].name);

      if (!condition) {
         setFiles((prev) => [...prev, ...e.dataTransfer.files]);
      }
      setDrag(false);
   };

   return drag ? (
      <div
         className='drag_body'
         onDragStart={(e) => dragStart(e)}
         onDragLeave={(e) => dragLeave(e)}
         onDragOver={(e) => dragStart(e)}
         onDrop={(e) => dragDrop(e)}
      >
         Drop here
      </div>
   ) : (
      <div className='drag_body' onDragStart={(e) => dragStart(e)} onDragLeave={(e) => dragLeave(e)} onDragOver={(e) => dragStart(e)}>
         Takes here
      </div>
   );
};

export default DragAndDrop;
