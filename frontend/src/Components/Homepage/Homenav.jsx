import { useNavigate } from "react-router-dom";

export function Homenav() {
  const navigate = useNavigate();

  return (
    <div>
      <nav className="bg-black sm:h-[80px] h-[60px] w-screen flex ">
        <div className="flex items-center text-white justify-between w-screen">
          <p
            className="text-white font-extrabold sm:text-[40px] text-[30px] sm:ml-20 ml-4 cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Lpay
          </p>
          <p className="sm:mr-20 mr-4 font-sans sm:text-lg text-[16pxPsi]">Made your life easy</p>
        </div>
      </nav>
    </div>
  );
}
