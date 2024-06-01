import { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import { Minus, Plus } from '@phosphor-icons/react';

interface ICounterProps {
  countInit?: number;
  onChage?: (count: number) => void;
  minValue?: number;
}

const Counter = ({ countInit = 0, minValue = 0, onChage }: ICounterProps) => {
  const [count, setCount] = useState(countInit);

  useEffect(() => {
    onChage?.(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <div
      data-testid='counter'
      className='border border-gray-400 gap-x-2 p-1 flex flex-row justify-between rounded-xl w-full'
    >
      <IconButton
        aria-label='disminuir'
        size='small'
        disabled={count === minValue}
        onClick={() => setCount((prev) => prev - 1)}
        className={`${count === minValue && 'cursor-not-allowed opacity-30'}`}
      >
        <Minus size={14} />
      </IconButton>
      <p className='text-gray-500'>{count}</p>
      <IconButton
        aria-label='aumentar'
        size='small'
        onClick={() => setCount((prev) => prev + 1)}
      >
        <Plus size={14} />
      </IconButton>
    </div>
  );
};

export default Counter;
