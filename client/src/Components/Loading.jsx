import { InfinitySpin } from 'react-loader-spinner';
import '../Css Files/modal.css';

const Loading = () => {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <InfinitySpin />
      </div>
    </div>
  );
};

export default Loading;
