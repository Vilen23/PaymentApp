import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { modalAtom } from "../../States/ModalState";
import { recAtom } from "../../States/reciever";
import { useRef } from "react";
import { signinAtom } from "../../States/SigninState";
import { amountAtom } from "../../States/Amount";
import { isvalidAtom } from "../../States/InvalidInputs";
import axios from "axios";
import { authAtom } from "../../States/Authtoken";
import { successAtom } from "../../States/success";

export function Modal() {
  const [modal, setModal] = useRecoilState(modalAtom);
  const reciever = useRecoilValue(recAtom);
  const modalref = useRef();
  const signin = useRecoilValue(signinAtom);
  const [amount, setAmount] = useRecoilState(amountAtom);
  const [isvalid, setisvalid] = useRecoilState(isvalidAtom);
  const token = useRecoilValue(authAtom);
  const [success, setSuccess] = useRecoilState(successAtom);

  const closeModal = (e) => {
    if (modalref.current === e.target) {
      setModal(!modal);
    }
  };
  const sendMoney = async () => {
    if (amount === null || amount.trim() === '') {
        setisvalid(false);
        return;
      }

    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          amount: parseInt(amount),
          to: reciever._id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        alert("payment done");
        setSuccess(!success);
        setModal(false);
        setisvalid(true)
      } else {
        setisvalid(false);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div
      className="inset-0 fixed bg-black bg-opacity-30 rounded-lg shadow-lg flex flex-col justify-center items-center"
      onClick={closeModal}
      ref={modalref}
    >
      {!isvalid && <div className="   text-red-500 pb-2 ">Invalid Inputs</div>}
      <div className="h-[330px] w-[400px] bg-white flex flex-col items-center  rounded-lg">
        <p className="font-bold text-center text-3xl pt-10 pb-4">SEND MONEY</p>
        <div className="flex items-center py-2">
          <p>Sending Money to</p>
          <p className="pl-1 font-bold text-xl">{reciever.Username}</p>
        </div>

        <div className="flex flex-col items-center pb-3 pt-2">
          <label htmlFor="Amount" className="font-bold pl-1 text-[26px]">
            Amount
          </label>
          <input
            type="number"
            placeholder="Amount(in $)"
            id="Amount"
            className="pl-2 h-10 rounded-[3px] border-[1px] border-solid border-gray focus:outline-none"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            onClick={()=>{
                setisvalid(true)
            }}
          />
        </div>
        <button
          className="w-[150px] text-white bg-black h-[45px] font-bold rounded-[10px] text-xl hover:shadow-lg"
          onClick={sendMoney}
        >
          Send Money
        </button>
      </div>
    </div>
  );
}
