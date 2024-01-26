import axios from "axios";
import { useRecoilValue } from "recoil";
import { authAtom } from "../../States/Authtoken";
import { useEffect, useState } from "react";
import { successAtom } from "../../States/success";

export function Balance() {
  const token = useRecoilValue(authAtom);
  const [balance, setBalance] = useState("");
  const success = useRecoilValue(successAtom)

  const fetchdata = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log("hi");

      // Assuming the response structure is { balance: 123.45 } or similar
      const formattedBalance = parseFloat(res.data.balance).toFixed(2);
      setBalance(formattedBalance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [token,success]);

  return (
    <div className="h-[60px] flex items-center sm:pl-[40px]  pl-[20px] mb-[20px]">
      <div className="font-bold sm:text-2xl text-xl">Your Balance is ${balance}</div>
    </div>
  );
}
