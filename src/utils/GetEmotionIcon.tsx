import s from '../components/EmotionList/EmotionList.module.css';
import Happy from '../assets/moodIcons/happy.svg';
import Sad from '../assets/moodIcons/sad.svg';
import Angry from '../assets/moodIcons/angry.svg';
import Upset from '../assets/moodIcons/upset.svg';
import Simsim from '../assets/moodIcons/simsim.svg';
import Tired from '../assets/moodIcons/tired.svg';

interface EmotionIconProps {
  type: number;
}

function GetEmotionIcon({ type }: EmotionIconProps): JSX.Element {
  const getEmotionIcon = (emotion: number): string => {
    switch (emotion) {
      case 1:
        return Happy;
      case 2:
        return Sad;
      case 3:
        return Angry;
      case 4:
        return Upset;
      case 5:
        return Simsim;
      case 6:
        return Tired;
      default:
        return '';
    }
  };
  return (
    <img
      src={getEmotionIcon(type)}
      alt={`${getEmotionIcon(type)}`}
      className={s.button}
    />
  );
}
export default GetEmotionIcon;
