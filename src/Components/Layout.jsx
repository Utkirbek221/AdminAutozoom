import Header from '../Pages/Header'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Pages/Sidebar'
import { useState } from 'react'

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <>
            <div className='flex w-full h-screen bg-[#222222] p-1'>
                <div className={`${isMenuOpen  ? 'w-[6%] duration-300' : 'w-[20%] duration-300'}`} >
                    <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
                </div>
                <div className={isMenuOpen  ? 'w-[94%] duration-300 ml-1' : 'w-[80%] duration-300 ml-1'}>
                    <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
                    <Outlet />
                </div>
            </div>
        </>
    )
}
