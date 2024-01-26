import { useNavigate } from "react-router-dom"

export function Hero(){
    const navigate = useNavigate()
    return <div className=" w-screen flex justify-center items-center mt-20">
        <div>
            <div className="flex flex-col items-center justify-center">
                <p className="font-bold sm:text-[200px] text-[150px] text-center">Lpay</p>
                <p className="sm:text-[20px] pl-[80px] text-[18px]">Your Life Made Easy</p>
            </div>
            <div className="flex justify-center items-center mt-10">
                <button className=" bg-black sm:w-[100px] w-[80px] rounded-full sm:h-[50px] h-[40px] font-bold sm:text-[20px] text-[15px] text-white text-center hover:shadow-xl "
                onClick={()=>{
                    navigate("/signup")
                }}>Sign Up</button>
                <button className="ml-10 bg-black sm:w-[100px] w-[80px] rounded-full sm:h-[50px] h-[40px] font-bold sm:text-[20px] text-[15px] text-white text-center hover:shadow-xl "
                onClick={()=>{
                    navigate("/signin")
                }}>Sign In</button>
            </div>
        </div>
    </div>
}