import WarningIcon from '../../assets/confirm/warning_icon.svg';
import SadIcon from '../../assets/confirm/sad_icon.svg';
import ReactDOM from 'react-dom';

interface ConfimPopupType {
  setIsConfirmModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  iconName: string;
  confirmText: string;
  additionalText?: string;
  leftText?: string;
  rightText?: string;
  leftHandle?: () => void;
  rightHandle?: () => void;
}

function ConfirmModal({
  setIsConfirmModalOpen,
  iconName,
  confirmText,
  additionalText,
  leftText = '취소',
  rightText = '모두 해제',
  leftHandle = () => setIsConfirmModalOpen(false),
  rightHandle = () => setIsConfirmModalOpen(false),
}: ConfimPopupType) {
  return ReactDOM.createPortal(
    <div className='modal-wrapper fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='modal z-[1000] flex w-[320px] flex-col gap-7 rounded-2xl bg-brand-white p-10 drop-shadow-lg'>
        <div className='flex items-center justify-center'>
          <img src={iconName === 'bookmark' ? WarningIcon : SadIcon} alt='' />
        </div>
        <div>
          <p className='text-lg font-semibold'>{confirmText}</p>
          {additionalText && (
            <p className='mt-1 text-sm text-rose-500'>{additionalText}</p>
          )}
        </div>
        <div className='mt-4 flex justify-between gap-2'>
          <button
            className='w-full rounded-lg border border-brand-black bg-brand-white px-4 py-2 text-base font-semibold text-brand-black'
            onClick={leftHandle}
          >
            {leftText}
          </button>
          <button
            className='w-full rounded-lg border border-brand-main bg-brand-main px-4 py-2 text-base font-semibold text-brand-white'
            onClick={rightHandle}
          >
            {rightText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
export default ConfirmModal;
