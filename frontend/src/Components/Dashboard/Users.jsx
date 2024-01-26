import { useSetRecoilState } from "recoil"
import { filterAtom } from "../../States/Filter"

export function Users(){
    const setfilter = useSetRecoilState(filterAtom)

    return <div className="flex flex-col mx-[40px] h-[100px] justify-around">
        <div className="font-bold text-2xl pl-2">
            Users
        </div>
        <div className="min-w-screen">
            <input type="search" placeholder="Search Users..." className=" rounded-lg shadow-sm pl-2 w-full h-[40px] border-[2px] border-gray-200 focus:outline-gray-300"
            onChange={(e)=>{
                setfilter(e.target.value)
            }}/>
        </div>
        
    </div>
}