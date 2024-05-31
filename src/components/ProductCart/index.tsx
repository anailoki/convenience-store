import Counter from '../Counter';
import { IconButton } from '@mui/material';
import { XCircle } from '@phosphor-icons/react';
import { UTILS } from '../../shared/utils/index';

interface IProductCardProps {
  name: string;
  image: string;
  price: number;
  countInit: number;
  onDelete?: () => void;
  onChangeAmount?: (count: number) => void;
}

const ProductCard = ({
  name,
  image,
  price,
  countInit,
  onDelete,
  onChangeAmount,
}: IProductCardProps) => {
  return (
    <>
      <div className='sm:hidden flex relative gap-x-2 shadow-md mb-6 border border-slate-100 rounded-md p-1'>
        <div className='absolute right-0'>
          <IconButton onClick={onDelete}>
            <XCircle size={24} />
          </IconButton>
        </div>
        <img
          src={image}
          alt='Imagen del producto'
          className='size-20 xl:size-22'
        />

        <div className='flex flex-col justify-center'>
          <p className='font-medium mb-2'>{name}</p>
          <div className='flex gap-4 items-center justify-evenly '>
            <Counter
              countInit={countInit}
              onChage={onChangeAmount}
              minValue={1}
            />
            <p>{UTILS.formatCurrency(price)}</p>
          </div>
        </div>
      </div>
      <div className='hidden sm:flex flex-row justify-between items-center my-4'>
        <div className='inline-flex items-center'>
          <img
            src={image}
            alt='Imagen del producto'
            className='size-20 xl:size-22'
          />
          <p className='font-medium'>{name}</p>
        </div>

        <div className='flex flex-row gap-4 items-center lg:w-1/3'>
          <Counter
            countInit={countInit}
            onChage={onChangeAmount}
            minValue={1}
          />
          <p className='w-full text-center'>{UTILS.formatCurrency(price)}</p>
          <IconButton onClick={onDelete}>
            <XCircle size={24} />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
