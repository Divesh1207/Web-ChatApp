import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies=new Cookies();

export const Auth=(props)=>{
    const {setIsAuth}=props;
    const signInWithGoogle=async()=>{
        try{
        const result=await signInWithPopup(auth,provider);
         cookies.set("divesh-token",result.user.refreshToken);//it helps to store the cookie 
         setIsAuth(true);//it always true so that when we shut close the laptop then it stores in cookies 
         //setIsAuth(true) this line gives the result jb user website p aayega tb usko sigin krne bolnge jn wo sigin
         //kr lega to wo enter chat room k page m aayega to jb bhi wo future m kbhi aayega to usko page
         //refresh nhi krna pdega seedhe ek baar phele kbhi sigin kiya hoga to wo aajayega chat rooom k page m
        // console.log(result);
        }catch
        {
            console.error("you made a mistake");
        }
    };
    return( <div className="auth">
       <p> Sign In With Google To Continue</p>
       <button onClick={signInWithGoogle}> Sign In With Google</button>
    </div>
    );
};