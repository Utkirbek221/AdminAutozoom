import { FaArrowLeft } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";


export default function Header({ isMenuOpen, setIsMenuOpen }) {

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <>
      <div className="bg-[#ccd8fd] w-full h-[70px] rounded-[8px]">
        <div className="flex justify-between items-center p-4">
          <div onClick={toggleMenu} className={`${isMenuOpen ? "rotate-180 duration-500 flex justify-center items-center gap-4 bg-[#fff] py-3 px-4 rounded-[8px]" : " duration-500  flex justify-center items-center gap-4 bg-[#fff] py-3 px-4 rounded-[8px]"}`} >
            <FaArrowLeft />
          </div>
          <div className="flex justify-center items-center gap-4">
            <RxAvatar />
            <img src="" alt="" />
            <h1>ADMIN</h1>
          </div>
        </div>
      </div>
    </>
  )
}
