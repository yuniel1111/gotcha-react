interface MenuItemType {
  path: string;
  label: string;
  isActive: boolean;
  Icon: React.ComponentType<{ className: string }>;
  ActiveIcon: React.ComponentType<{ className: string }>;
  handleClick: (url: string) => void;
}

function MenuItem({
  path,
  label,
  isActive,
  Icon,
  ActiveIcon,
  handleClick,
}: MenuItemType) {
  return (
    <li
      className={`flex h-full w-[60px] cursor-pointer flex-col items-center justify-center ${
        isActive ? 'text-brand-sub' : 'text-brand-black'
      }`}
      onClick={() => handleClick(path)}
    >
      {isActive ? (
        <ActiveIcon className='h-[20px] w-[20px] text-brand-main' />
      ) : (
        <Icon className='h-[20px] w-[20px] text-brand-black' />
      )}
      <span
        className={`text-[10px] ${isActive ? 'text-brand-main' : 'text-brand-black'}`}
      >
        {label}
      </span>
    </li>
  );
}

export default MenuItem;
