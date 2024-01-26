import { Balance } from "./Balance";
import { Navbar } from "./Navbar";
import { Users } from "./Users";
import { MappingUser } from "./MappingUser";
export function Dashboard(){
    return <div className="flex flex-col h-[1000px] ">
        <Navbar/>
        <Balance/>
        <Users/>
        <MappingUser/>
        
    </div>
}