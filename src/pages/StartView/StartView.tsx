
import style from './StartView.module.css'
import emo1 from '../../assets/emo1.svg'

export default function LoginView (){
    return(
        <div className={style.wrapp}>
          <div classNam={style.logoContainer}>

            <div classNam={style.logo}>
                <img src={emo1} title="emo1"/>
            </div>
    
            <div classNam={style.mess7}>오늘 내가 구운 쿠키는...</div>
    
            <div classNam={style.mess8}>~머랭</div>
    
          </div>
        </div>
    )
}

