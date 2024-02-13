import Happy from '../assets/moodIcons/happy.svg';
import Sad from '../assets/moodIcons/sad.svg';
import Angry from '../assets/moodIcons/angry.svg';
import Upset from '../assets/moodIcons/upset.svg';
import Simsim from '../assets/moodIcons/simsim.svg';
import Tired from '../assets/moodIcons/tired.svg';

export function getCategoryImg(index: number): string | null {
  switch (index) {
    case 1: return Happy;
    case 2: return Sad;
    case 3: return Angry;
    case 4: return Upset;
    case 5: return Simsim;
    case 6: return Tired;
    default: return null;
  }
}

export function getCategoryDataList() {
  return [
    {
      type: 1,
      name: '행복, 기쁨',
      color: '#FFEBA4',
    },
    {
      type: 2,
      name: '슬픔, 우울',
      color: '#98C8EC',
    },
    {
      type: 3,
      name: '화남, 분노',
      color: '#FFA0A0',
    },
    {
      type: 4,
      name: '예민, 걱정',
      color: '#FFB897',
    },
    {
      type: 5,
      name: '심심, 지루',
      color: '#E6C1EB',
    },
    {
      type: 6,
      name: '지침, 피곤',
      color: '#95EB98',
    },
  ];
}
