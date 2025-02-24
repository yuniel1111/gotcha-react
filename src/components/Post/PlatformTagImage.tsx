import { twMerge } from 'tailwind-merge';
import wantedTag from '../../assets/tag/wanted_tag.svg';

interface PlatformTagImagePropsType {
  platform_type: string;
  isHovered: boolean;
}
function PlatformTagImage({
  platform_type,
  isHovered,
}: PlatformTagImagePropsType) {
  return (
    <>
      <img
        className={twMerge(
          'absolute -left-1.5 -top-1.5 w-20',
          isHovered && 'z-20',
          platform_type && '', // 임시
        )}
        src={wantedTag}
        alt='wanted logo'
      />
    </>
  );
}

export default PlatformTagImage;
