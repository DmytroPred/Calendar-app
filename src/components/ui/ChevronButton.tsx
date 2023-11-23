interface Props {
  direction: string;
  handler: () => void;
}

const ChevronButton = ({ direction, handler }: Props) => {
  return (
    <button onClick={handler} className='flex items-center'>
      <span className='material-icons cursor-pointer text-gray-600 mx-2'>
        {`chevron_${direction}`}
      </span>
    </button>
  );
};

export default ChevronButton;
