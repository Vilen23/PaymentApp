import { atom } from "recoil";

const userinfoAtom = atom({
    key:"userinfoAtom",
    default:{
        Username:"",
        Firstname:"",
        Lastname:"",
        password:""
    }
})

export {
    userinfoAtom
}