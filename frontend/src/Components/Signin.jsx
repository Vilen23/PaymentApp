import { useRecoilState, useSetRecoilState } from "recoil";
import { signinAtom } from "../States/SigninState";
import { useNavigate } from "react-router-dom";
import { isvalidAtom } from "../States/InvalidInputs";
import axios from "axios";
import { authAtom } from "../States/Authtoken";

export function Signin() {
  const navigate = useNavigate();
  const [signin, setSignin] = useRecoilState(signinAtom);
  const [isvalid, setisvalid] = useRecoilState(isvalidAtom);
  const setAuthtoken = useSetRecoilState(authAtom)

  const HandleSignIn = async () => {
    if (signin.Username.trim() === "" || signin.password.trim() === "") {
      setisvalid(false);
      return;
    }
    try {
      console.log(signin);
      const res = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        signin
      );
      if (res.status === 200) {
        const {token} = res.data;
        setAuthtoken(token);
        console.log(token)
        navigate("/Dashboard");
      } else {
        console.log("hi")
        setisvalid(false);
      }
    } catch (error) {
      console.log("Error", error);
      setisvalid(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center font-popins">
      {!isvalid && <div className="   text-red-500 pb-2 ">Invalid Inputs or user not found</div>}
      <div className="sm:h-[500px] sm:w-[450px] h-[400px] w-[380px] bg-white rounded-lg  shadow-lg flex flex-col items-center justify-around py-6">
        <div className="text-center">
          <p className="font-extrabold text-[40px] mb-2">Sign In</p>
          <p className="text-gray-600 sm:w-[350px] w-[300px]">
            Enter your credentials to enter your account
          </p>
        </div>
        <div className="flex flex-col sm:w-[350px] w-[300px]">
          <label htmlFor="loginusername" className="font-bold pl-1 text-[16px]">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            id="loginusername"
            className="pl-2 h-10 rounded-[3px] border-[1px] border-solid border-gray focus:outline-none"
            onChange={(e) => {
              setSignin({ ...signin, Username: e.target.value });
            }}
            onClick={()=>{
                setisvalid(true)
            }}
          />
        </div>
        <div className="flex flex-col sm:w-[350px] w-[300px]">
          <label htmlFor="loginpassword" className="font-bold pl-1 text-[16px]">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            id="loginpassword"
            className="pl-2 h-10 rounded-[3px] border-[1px] border-solid border-gray focus:outline-none"
            onChange={(e) => {
              setSignin({ ...signin, password: e.target.value });
            }}
            onClick={()=>{
                setisvalid(true)
            }}
          />
        </div>
        <div>
          <button
            className="sm:w-[300px] w-[250px] text-white bg-black h-[45px] font-bold rounded-[10px] text-xl"
            onClick={HandleSignIn}
          >
            Sign In
          </button>
        </div>
        <div className="flex items-center">
          <p>Do not have an account?</p>
          <p className="pl-2 text-blue-600 underline text-sm cursor-pointer" onClick={()=>{
            navigate("/signup")
          }}>Sign Up</p>
        </div>
      </div>
    </div>
  );
}
