import { Minus, Plus } from '@phosphor-icons/react';
import React, { useState } from 'react';

interface ICollapseProps {
  label: string;
  children: React.ReactNode;
  isOpen?: boolean;
}

const Collapse = ({ label, children, isOpen }: ICollapseProps) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <>
      <div
        data-testid='collapse'
        className='bg-slate-100 py-3 px-2 flex gap-x-8 justify-between items-center cursor-pointer mb-3'
        onClick={() => setOpen(!open)}
      >
        <span className='uppercase text-md font-medium'>{label}</span>
        {open ? <Minus size={20} /> : <Plus size={20} />}
      </div>
      {open && (
        <div className='my-3 px-4' data-testid='children-collapse'>
          {children}
        </div>
      )}
    </>
  );
};

export default Collapse;
