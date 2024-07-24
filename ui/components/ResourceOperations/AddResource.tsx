type AddResourceProps = {
  handleClick: () => void;
};

const AddResource = ({ handleClick }: AddResourceProps) => {
  return (
    <div onClick={handleClick} className='rounded-bl-3xl rounded-tr-3xl p-3 pt-3 items-center justify-center text-center border text-2xl hover:bg-blue-500 text-white'>+</div>
  );
};

export default AddResource;