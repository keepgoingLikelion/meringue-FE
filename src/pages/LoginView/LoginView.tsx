import style from './LoginView.module.css'
import basicLogoLined from '../../assets/basic-logo-lined.svg'
import questionMark from '../../assets/question-mark.svg'
import loginButton from '../../assets/login-button.svg'



export default function LoginView (){
    return (
        <div className={style.wrapp}>
         <div className={style.logoContainer}>
        <div className={style.logo}>
            <img src={basicLogoLined} title="basic-logo-lined"/>
        </div>

        <div className={style.mess1}>너랑 나랑 나누는 마음 이야기</div>

        <div className={style.mess2}>머랭<img src={questionMark} title="question-mark"/></div>

        <div className={style.loginButton}>
                <img src={loginButton} title="login-button" />
        </div>

        </div>
        </div>
    )
}

