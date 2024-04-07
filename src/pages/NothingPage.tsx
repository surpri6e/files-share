import React from 'react';
import '../styles/NothingPage/nothingPage.scss';

interface INothingPageProps {
   content?: string;
}

const NothingPage: React.FC<INothingPageProps> = ({ content }) => {
   return <div className='nothing_page'>{content ? content : 'This page does not exist.'}</div>;
};

export default NothingPage;
