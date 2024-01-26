import { useRecoilState } from "recoil"
import { userinfoAtom } from "../States/SignupState"
import { useNavigate } from "react-router-dom";
import { isvalidAtom } from "../States/InvalidInputs";
import axios from "axios";

export function Signup(){
    const navigate = useNavigate();
    const [userInfo,setuserInfo] = useRecoilState(userinfoAtom);
    const [isvalid,setisvalid] = useRecoilState(isvalidAtom)
    const HandleSignup = async()=>{
        if (
            userInfo.Firstname.trim() === '' ||
            userInfo.Lastname.trim() === '' ||
            userInfo.Username.trim() === '' ||
            userInfo.password.trim() === ''
        ) {
            // Handle the case when any required field is empty
            setisvalid(false);
            console.log("Please fill in all required fields.");
            return;
        }
        const res =  await axios.post("http://localhost:3000/api/v1/user/signup",
        userInfo)
        if(res.status===200){
            navigate("/Signin")
        }
        else{
            setisvalid(false)
            console.log("heii")
        }
    }

    return <div className="min-h-screen flex flex-col justify-center items-center font-popins">
        {!isvalid && <div className="   text-red-500 pb-2 "> 
                Invalid Inputs 
            </div>}
        <div className="sm:h-[600px] h-[500px] am:w-[450px] w-[380px] bg-white rounded-lg  shadow-lg flex flex-col items-center justify-around py-2">
        <div className="text-center">
            <p className="font-extrabold text-[40px]">Sign Up</p>
            <p className="text-gray-600">Enter your information to singup</p>
        </div>
        <div className="flex flex-col sm:w-[350px] w-[300px]">
            <label htmlFor="Firstname" className="font-bold pl-1 text-[16px]">Firstname</label>
            <input type="text" placeholder="For eg (Shivam)" id="Firstname" className="pl-2 h-10 rounded-[3px] border-[1px] border-solid border-gray focus:outline-none"
            onChange={(e)=>{
                setuserInfo({...userInfo,Firstname:e.target.value})
            }} onClick={()=>{
                setisvalid(true)
            }}/>
        </div>
        <div className="flex flex-col sm:w-[350px] w-[300px]">
            <label htmlFor="Lastname" className="font-bold pl-1 text-[16px]">Lastname</label>
            <input type="text" placeholder="For eg (Lather)" id="Lastname" className="pl-2 h-10 rounded-[3px] border-[1px] border-solid border-gray focus:outline-none"
            onChange={(e)=>{
                setuserInfo({...userInfo,Lastname:e.target.value})
            }} onClick={()=>{
                setisvalid(true)
            }}/>
        </div>
        <div className=" flex flex-col sm:w-[350px] w-[300px]">
            <label htmlFor="Email/Username" className="font-bold pl-1 text-[16px]">Email/Usernamee</label>
            <input type="text" placeholder="For eg (abc@gmail.com)" id="Email/Username" className="pl-2 h-10 rounded-[3px] border-[1px] border-solid border-gray focus:outline-none"
            onChange={(e)=>{
                setuserInfo({...userInfo,Username:e.target.value})
            }} onClick={()=>{
                setisvalid(true)
            }}/>
        </div>
        <div className="flex flex-col sm:w-[350px] w-[300px]">
            <label htmlFor="Password" className="font-bold pl-1 text-[16px]">Password</label>
            <input type="password" placeholder="Password" id="Password" className="pl-2 h-10 rounded-[3px] border-[1px] border-solid border-gray focus:outline-none"
            onChange={(e)=>{
                setuserInfo({...userInfo,password:e.target.value})
            }} onClick={()=>{
                setisvalid(true)
            }}/>
        </div>
        <div>
            <button className="sm:w-[300px] w-[250px] text-white bg-black h-[45px] font-bold rounded-[10px] text-xl"
            onClick={HandleSignup}>Signup</button>
        </div>
        <div className="flex justify-around items-center">
            <p>Already have an account?</p>
            <p className="cursor-pointer pl-1 text-blue-500 underline text-sm" onClick={()=>{
                navigate("/signin")
            }}>Login</p>
        </div>
    </div>
    </div>
}