import { atom } from "recoil";

const signinAtom = atom({
    key:"signinAtom",
    default:{
        Username:"",
        password:""
    }
})

export{
    signinAtom
}