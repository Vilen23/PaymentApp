import { atom } from "recoil";

const usersAtom = atom({
    key:"userAtom",
    default:[{}]
})

export{
    usersAtom
}