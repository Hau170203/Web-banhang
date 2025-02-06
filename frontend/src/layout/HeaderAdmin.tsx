import { Link } from "react-router"
import DropDown from "../components/DropDown"


const HeaderAdmin = () => {
    return (
        <>
            <header className=" bg-blue-500">
                <div className="flex items-center justify-between container h-[70px] w-screen px-5 z-50 mx-auto">
                    <Link className="text-white text-3xl " to={"/"}>Shop shoes</Link>
                    <div className="min-w-[200px]">
                        <DropDown />
                    </div>
                </div>

            </header>
        </>
    )
}

export default HeaderAdmin