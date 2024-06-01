interface ICategoryButtonProps {
  name: string;
  img: string;
  onClick?: () => void;
  className?: string;
}

const CategoryButton = ({
  name,
  className,
  img,
  onClick,
}: ICategoryButtonProps) => {
  return (
    <div
      data-testid='category-button'
      className={`bg-slate-50 pl-3 pt-3 rounded-lg shadow xl:shadow-none hover:shadow-lg ${className} gap-2 xl:w-52`}
      onClick={onClick}
    >
      <span className='pr-3 xl:text-lg'>{name}</span>
      <div className='flex justify-end'>
        <img src={img} alt={name} className='w-20' />
      </div>
    </div>
  );
};

export default CategoryButton;
