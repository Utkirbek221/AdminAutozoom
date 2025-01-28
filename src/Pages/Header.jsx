import { useEffect, useRef, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { IoClose, IoSettingsOutline } from "react-icons/io5";
import { PiSignOutFill } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";
import { TiEdit } from "react-icons/ti";
import { Link, useNavigate } from "react-router";


export default function Header({ isMenuOpen, setIsMenuOpen }) {
  const [isOpen, setIsOpen] = useState(false)
  const [logaout, setLogaout] = useState(false)
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  const toggleLogaout = () => {
    setLogaout(!logaout)
  }
  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const navigate = useNavigate()
  const clickLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }
  const proflcss = "flex justify-start items-center duration-300 rounded-[5px] hover:text-[#fff] hover:bg-[#222222] text-[#222222] gap-2 px-2 py-1 font-[600] text-lg cursor-pointer"
  return (
    <>
      <div className="bg-[#ccc5b9] w-full h-[70px] rounded-[8px]">
        <div className="flex justify-between items-center p-4">
          <div onClick={toggleMenu} className={`${isMenuOpen ? "rotate-180 duration-500 flex justify-center items-center gap-4 bg-[#fff] py-3 px-4 rounded-[8px]" : " duration-500  flex justify-center items-center gap-4 bg-[#fff] py-3 px-4 rounded-[8px]"}`} >
            <FaArrowLeft />
          </div>
          <div onClick={toggleIsOpen} className={isOpen ? "duration-300 border-2 border-[#222222] flex justify-center items-center gap-2 font-[800] cursor-pointer bg-[#fff] py-2 px-4 rounded-[8px]" : "duration-300 flex justify-center items-center gap-2 font-[800] cursor-pointer bg-[#fff] py-2 px-4 rounded-[8px]"}>
            <RxAvatar className="text-2xl" />
            <img src="" alt="" />
            <h1>ADMIN</h1>
          </div>
        </div>
      </div>
      {isOpen && (
        <div ref={menuRef} className="fixed top-17 right-3.5 z-50 flex justify-center items-center duration-500 rounded-[8px]">
          <div className="border-2 border-[#222222] bg-[#fff] duration-500  w-[145px] h-auto rounded-[6px] p-1 flex flex-col gap-1">
            <div className={proflcss}>
              <RxAvatar className="text-2xl " />
              <h1>Profile</h1>
            </div>
            <div className={proflcss}>
              <TiEdit className="text-2xl " />
              <h1>Edit</h1>
            </div>
            <Link to={"/home/settings"} onClick={toggleIsOpen} className={proflcss}>
              <IoSettingsOutline className="text-2xl " />
              <h1>Settings</h1>
            </Link>
            <div onClick={toggleLogaout} className="flex justify-start items-center duration-300 rounded-[5px] hover:text-[red] hover:bg-[#fbd0d0] text-[#222222] gap-2 px-2 py-1 font-[600] text-lg cursor-pointer">
              <PiSignOutFill className="text-2xl " />
              <h1>Logout</h1>
            </div>
          </div>
        </div>
      )}
      {logaout && (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-[#22222251] z-50 flex justify-center items-center duration-500 rounded-[8px]">
          <div className="border-2 border-[#222222] bg-[#fff] duration-500  w-auto h-auto rounded-[6px] p-5 flex flex-col gap-1 relative">
            <div onClick={toggleLogaout} className="cursor-pointer absolute -top-2 -right-2 text-xl bg-[#fff] border-[2px] border-[#222222] rounded-[50%]">
              <IoClose />
            </div>
            <h1 className="text-xl font-[700] mb-10">ARE YOU SURE?</h1>
            <div className="gap-3 flex">
              <button onClick={toggleLogaout} className="cursor-pointer duration-500 bg-[#222222] text-[#fff] hover:text-[green] hover:bg-[#c3fcc3] px-3 py-1 rounded-[8px]">NO</button>
              <button onClick={clickLogout} className="cursor-pointer duration-500 bg-[#222222] text-[#fff] hover:text-[red] hover:bg-[#fbd0d0] px-3 py-1 rounded-[8px]">YES</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
