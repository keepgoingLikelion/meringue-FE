import styles from './TodayPostView.module.css'
import basicLogoLined from '../../assets/basic-logo-lined.svg'
import emo1_1 from '../../assets/emo1_1.svg'
import emo2 from '../../assets/emo2.svg'
import emo3 from '../../assets/emo3.svg'
import emo4 from '../../assets/emo4.svg'
import emo5 from '../../assets/emo5.svg'
import emo6 from '../../assets/emo6.svg'

import { useEffect, useState } from 'react';
import axios from 'axios'

const getDataToString =(date:Date) : string => {
    console.log(date)
    const currentDate :Date = new Date(date.toString());
    const m :number = currentDate.getMonth() + 1;
    const d :number = currentDate.getDate();
    return `${currentDate.getFullYear()}.${m >= 10? m: `0${m}`}.${d>=10 ? d:`0${d}`}`;
};

 interface userInfo {
    email: string;
    nickname: string;
 }




  interface postInfo {
    emotionType: number;
    content: string;
  }


export default function TodayPostView(){
    const[userData, setUserData] = useState<userInfo | null>(null);
    const[post, setpost] = useState<string >('');
    const[emoType, setEmoType] = useState<number>(0);

    useEffect(()=>{
        axios.get<userInfo>('/api/user/me').then((v)=> {setUserData(v.data)})
    },[]);


    const onClickSave= ()=>{
        if(emoType===0){return }
        const req: postInfo = {
            content: post,
            emotionType: emoType
        }
        axios.post<postInfo>('/api/post',req)
    };




    return(
        <div className={styles.wrapp}>

         <div className={styles.postContainer}>
           <div className={styles.top}>
             <div className={styles.basicLogo}>
               <img src={basicLogoLined} title="basic-logo"/>
             </div>

             <div className={styles.nickName}> 
              <b>{userData?.nickname}</b>
             </div>

             <div className={styles.date}>
                {getDataToString(new Date())}
             </div>
           </div>
      
           <div className={styles.massBox}>

            <div className={styles.mess5}> 내 <b>마음</b>은 뭐랭? </div>

            <label>
             <textarea value={post} onChange={(e)=>{setpost(e.target.value)}} className={styles.notes} id="editor" >
             </textarea>
             {/* contenteditable="true" */}
            </label>

            <div className={styles.mess6}> 내 <b>감정</b>은 머랭? </div>

           <div className={styles.emoContainer}>
            <li className={styles.emo1}>
                <input type="radio" name='radioButton' onChange={(e)=>{setEmoType(parseInt(e.target.value))}} value='1' className={styles.checkBox}  id="chk1" />
                <label htmlFor="chk1"></label>
                <img src={emo1_1} title="emo1"/>
                <h1>오예</h1>
            </li>

            <li className={styles.emo2}>
                <input className={styles.checkBox} type="radio" name='radioButton' onChange={(e)=>{setEmoType(parseInt(e.target.value))}} value='2' id="chk2" />
                <label htmlFor="chk2"></label>
                <img src={emo2} title="emo2"/>
                <h1>뿌앵</h1>
            </li>

            <li className={styles.emo3}>
                <input className={styles.checkBox} value='3' type="radio" name='radioButton' onChange={(e)=>{setEmoType(parseInt(e.target.value))}} id="chk3" />
                <label htmlFor="chk3"></label>
                <img src={emo3} title="emo3"/>
                <h1>부글부글</h1>
            </li>

            <li className={styles.emo4}>
                <input className={styles.checkBox} type="radio" value='4' name='radioButton' onChange={(e)=>{setEmoType(parseInt(e.target.value))}} id="chk4" />
                <label htmlFor="chk4"></label>
                <img src={emo4} title="emo4"/>
                <h1>까칠</h1>
            </li>

            <li className={styles.emo5}>
                <input className={styles.checkBox} type="radio" value='5' name='radioButton' onChange={(e)=>{setEmoType(parseInt(e.target.value))}} id="chk5" />
                <label htmlFor="chk5"></label>
                <img src={emo5} title="emo5"/>
                <h1>심심</h1>
            </li>

            <li className={styles.emo6}>
                <input className={styles.checkBox} type="radio" value='6' name='radioButton' onChange={(e)=>{setEmoType(parseInt(e.target.value))}} id="chk6" />
                <label htmlFor="chk6"></label>
                <img src={emo6} title="emo6"/>
                <h1>너덜너덜</h1>
            </li>
           </div>

           <div className={styles.saveButton}>
            <button type="button" onClick={onClickSave}>
               저장
            </button>
           </div>

          </div>

         </div>    



        </div>
    )
}
