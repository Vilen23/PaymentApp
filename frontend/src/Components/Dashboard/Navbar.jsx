import { useRecoilValue } from "recoil"
import { signinAtom } from "../../States/SigninState"

export function Navbar(){
    const user = useRecoilValue(signinAtom)
    return <div>
        <div className=" text-black flex justify-between h-[70px] items-center sm:px-10 px-6 border-b-2 shadow-sm cursor-pointer ">
            <p className="text-[40px] font-extrabold ">Lpay</p>
            <p className="text-xl font-medium ">Hello , {user.Username}</p>
        </div>
    </div>
}