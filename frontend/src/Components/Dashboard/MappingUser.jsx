import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { usersAtom } from "../../States/Users";
import axios from "axios";
import { filterAtom } from "../../States/Filter";
import { useEffect } from "react";
import { signinAtom } from "../../States/SigninState";
import { modalAtom } from "../../States/ModalState";
import { Modal } from "./Modal";
import { recAtom } from "../../States/reciever";

export function MappingUser() {
  const [users, setUsers] = useRecoilState(usersAtom);
  const signinuser = useRecoilValue(signinAtom);
  const filterval = useRecoilValue(filterAtom);
  const [modal,setModal] = useRecoilState(modalAtom)
  const setReciever = useSetRecoilState(recAtom)
  const fetchusers = async () => {
    const res = await axios.get("http://localhost:3000/api/v1/user/bulk", {
      params: {
        filter: filterval,
      },
    });
    const { users } = res.data;
    setUsers(users);
  };
  useEffect(() => {
    fetchusers();
  }, [filterval]);

  return (
    <div className="px-10">
      {users.map((user) => {
        return (
          <div>
            {!(user.Username === signinuser.Username) && (
              <div className="flex justify-between px-[20px] h-[60px] items-center shadow-sm hover:shadow-gray-400">
                <p className="font-bold text-lg">{user.Username}</p>
                <button
                  className="w-[120px] h-[40px] rounded-lg hover:shadow-xl bg-black text-white font-bold"
                  onClick={() => {
                    setModal(!modal)
                    setReciever(user)
                    console.log(user);
                  }}
                >
                  Send Money
                </button>
              </div>
            )}
          </div>
        );
      })}
      {modal &&<Modal/>}
    </div>
  );
}
