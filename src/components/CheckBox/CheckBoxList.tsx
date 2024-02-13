import React, {useState} from "react";
import checkBox from "./CheckBox";

const [checkItems, setCheckItems] = useState(new Set)

export default function App(){
    const checkList = [...Array(1).fill("체크").map((v,i)=>v+i)]
    const checkItemHandler = (id, isChecked)=>{
        if(isChecked){
            checkItems.add(id)
            setCheckItems(checkItems)
            console.log(checkItems)
         return{checkList.map((text, index)=>(
            <checkBox
            key={index}
            text={text}
            id={`id`+index}
            checkItemHandler={checkItemHandler} />
        ))}
    }

    return(
        <div>
            {checkList.map((issue,index)=>(
                <checkBox key={index} id={`id`+index} />
            ))
            }
        </div>
    )

}