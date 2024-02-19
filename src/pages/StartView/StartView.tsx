import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import style from './StartView.module.css'

interface EmotionIconProps {
  type: number;
}

export default function LoginView ({type}:EmotionIconProps): JSX.Element {
  const navigation = useNavigate();

  useEffect(() => {
      setTimeout(function () {
          navigation("/main");
      }, 3000);
  }, []);

  const userIcon = (emotionType:number): string =>{
    switch (emotionType){
      case 1: return 'happy';
      case 2: return 'sad';
      case 3: return 'angry';
      case 4: return 'upset';
      case 5: return 'simsim';
      case 6: return 'tired';
      default: return 'happy';
    }
  };

  const userType = (emotionType:number): string =>{
    switch (emotionType){
      case 1: return '오예';
      case 2: return '뿌앵';
      case 3: return '부글부글';
      case 4: return '까칠';
      case 5: return '심심';
      case 6: return '너덜너덜';
      default: return '오예';
    }
  };

    return(
        <div className={style.wrapp}>
          <div className={style.logoContainer}>

            <div className={style.logo}>
                <img className={style.today_logo} src={`/src/assets/moodIcons/${userIcon(type)}.svg`} alt={`${userIcon(type)}`}/>
            </div>
    
            <div className={style.mess7}>오늘 내가 구운 쿠키는...</div>
    
            <div className={style.mess8}>{userType(type)}머랭</div>
    
          </div>
        </div>
    )
}

