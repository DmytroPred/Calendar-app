interface Props {
  onDelete: () => void;
}

const DeleteEventButton = ({ onDelete }: Props) => {
  return (
    <button onClick={() => onDelete()}>
      <span className='material-icons text-gray-400 mr-2 bg-rounded-gray-hover'>
        delete
      </span>
    </button>
  );
};

export default DeleteEventButton;
