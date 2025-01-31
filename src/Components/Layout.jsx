import Header from '../Pages/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Pages/Sidebar'
import { useEffect, useState } from 'react'

export default function Layout() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate("/home");
        }else{
            navigate("/")
        }
    },[])
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <>
            <div className="flex w-full h-screen bg-[#222222] p-1">
                <div className={`${isMenuOpen ? 'w-[6%] duration-300' : 'w-[20%] duration-300'}`}>
                    <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                </div>
                <div className={isMenuOpen ? 'w-[94%] duration-300 ml-1' : 'w-[80%] duration-300 ml-1'}>
                    <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    <div className="w-full h-[90vh] bg-[#fff] mt-1 pl-1 rounded-[8px] overflow-y-auto border">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
