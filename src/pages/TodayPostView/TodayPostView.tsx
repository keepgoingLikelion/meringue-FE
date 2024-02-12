import styles from './TodayPostView.module.css'
import basicLogoLined from '../../assets/basic-logo-lined.svg.svg'
import emo1_1 from '../../assets/emo1_1.svg'
import emo2 from '../../assets/emo2.svg'
import emo3 from '../../assets/emo3.svg'
import emo4 from '../../assets/emo4.svg'
import emo5 from '../../assets/emo5.svg'
import emo6 from '../../assets/emo6.svg'

export default function TodayPostView(){
   
    return(
        <div className={styles.wrapp}>

         <div className={styles.postContainer}>
           <div className={styles.top}>
             <div className={styles.basicLogo}>
               <img src={basicLogoLined} title="basic-logo"/>
             </div>

             <div className={styles.nickName}> 
              <b>콩떡</b>
             </div>

             <div className={styles.date}>
              2024.1.11
             </div>
           </div>
      
           <div className={styles.massBox}>

            <div className={styles.mess5}> 내 <b>마음</b>은 뭐랭? </div>

            <label>
             <textarea className={styles.notes} id="editor" contenteditable="true"></textarea>
            </label>

            <div className={styles.mess6}> 내 <b>감정</b>은 머랭? </div>

           <div className={styles.emoContainer}>
            <li className={styles.emo1}>
                <input type="checkbox" className={styles.checkBox}  id="chk1" >
                <label for="chk1"></label>
                <img src={emo1_1} title="emo1"/>
                <h1>오예</h1>
            </li>

            <li className={styles.emo2}>
                <input className={styles.checkBox} type="checkbox" id="chk2" >
                <label for="chk2"></label>
                <img src={emo2} title="emo2"/>
                <h1>뿌앵</h1>
            </li>

            <li className={styles.emo3}>
                <input className={styles.checkBox} type="checkbox" id="chk3" >
                <label for="chk3"></label>
                <img src={emo3} title="emo3"/>
                <h1>부글부글</h1>
            </li>

            <li className={styles.emo4}>
                <input className={styles.checkBox} type="checkbox" id="chk4" >
                <label for="chk4"></label>
                <img src={emo4} title="emo4"/>
                <h1>까칠</h1>
            </li>

            <li className={styles.emo5}>
                <input className={styles.checkBox} type="checkbox" id="chk5" >
                <label for="chk5"></label>
                <img src={emo5} title="emo5"/>
                <h1>심심</h1>
            </li>

            <li className={styles.emo6}>
                <input className={styles.checkBox} type="checkbox" id="chk6" >
                <label for="chk6"></label>
                <img src={emo6} title="emo6"/>
                <h1>너덜너덜</h1>
            </li>
           </div>

           <div className={styles.saveButton}>
            <button type="button">
               저장
            </button>
           </div>

          </div>

         </div>    



        </div>
    )
}
