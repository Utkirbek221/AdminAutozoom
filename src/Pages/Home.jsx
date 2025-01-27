import { Link } from "react-router";

export default function Home() {
  return (
    <>
      <div className=''>
       <Link to={"/home/main"}>
        home
       </Link>
      </div>
    </>
  )
}
