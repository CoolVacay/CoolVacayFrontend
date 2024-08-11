import React, { type Dispatch, type SetStateAction } from 'react';
import { type DateRangeType } from '../home/SearchCard';
import Image from 'next/image';

function GridMapToggle({
  isMapMode,
  setIsMapMode,
  updateSearchParams,
}: {
  isMapMode: boolean;
  setIsMapMode: Dispatch<SetStateAction<boolean>>;
  updateSearchParams: (params: string[], values: string[] | DateRangeType) => void;
}) {
  return (
    <div className='flex shadow-xl border-2 rounded-3xl bg-white overflow-hidden'>
      <button
        className={`!text-primary flex-1 p-2 pl-3 transition-all duration-300 ease-in-out rounded-3xl ${
          !isMapMode && 'bg-primary text-white'
        }`}
        onClick={() => {
          setIsMapMode(false);
          updateSearchParams(['isMapMode'], ['false']);
        }}
      >
        <Image
          width='18'
          height='18'
          src='/grid_mode.svg'
          alt='Grid mode'
          className='transition-transform duration-300 ease-in-out transform hover:scale-110'
        />
      </button>
      <button
        className={`!text-primary flex-1 p-2 pl-3 transition-all duration-300 ease-in-out rounded-3xl ${
          isMapMode && 'bg-primary text-white'
        }`}
        onClick={() => {
          setIsMapMode(true);
          updateSearchParams(['isMapMode'], ['true']);
        }}
      >
        <Image
          width='18'
          height='18'
          src='/map_mode.svg'
          alt='Map mode'
          className='transition-transform duration-300 ease-in-out transform hover:scale-110'
        />
      </button>
    </div>
  );
}

export default GridMapToggle;
