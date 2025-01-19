import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';

export const ProjectCard = ({ title, description, imageUri }) => {
  return (
    <div className='project-card xl:aspect--5-4 rounded--20 relative flex h-full w-full max-w-[400px] cursor-pointer flex-col overflow-hidden shadow-elevation-dark-4 hover:shadow-elevation-dark-1'>
      <figure className='h-full max-h-[150px] w-full py-12 xl:max-h-full'>
        {imageUri ? (
          <Image
            className='h-full w-full object-cover'
            src={`/projects/${imageUri}`}
            layout='fill'
            alt={`project - ${title} - nullpod`}
          />
        ) : (
          <div className='flex h-full w-full flex-col items-center justify-center bg-slate-300 text-2xl font-bold uppercase'>
            Confidential Preview
          </div>
        )}
      </figure>
      <div
        className='description_overflow relative bottom-0 z-10 flex translate-x-0 flex-col
                items-center bg-primary-pink px-6 pt-4 text-center text-white xl:absolute xl:translate-y-[63%]'
      >
        <div className='description_title text--24-bold uppercase'>{title}</div>
        <div className='description text--base lg:min-h-[75px] my-4'>{description}</div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUri: PropTypes.string,
};
