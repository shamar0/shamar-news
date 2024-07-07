import Link from "next/link";
import Image from 'next/image';



export default function Navbar() {
  return (
   <>
    <nav className="navbar bg-body-tertiary" >
  <div className="container nav-img" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>, 
    <Link className="navbar-brand nav-brand" href="/news">
      <Image src="/MS.png" alt="Logo" width={170} height={63}/>
    </Link>
  </div>
   </nav>
   </>
  )
}
