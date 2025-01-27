import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <div className='w-full min-h-[90vh] bg-[#fff] mt-1 pl-1 rounded-[8px]'>
       <Link to={"/home/main"}>
        home
       </Link>
      </div>
    </>
  )
}
