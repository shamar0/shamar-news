import Link from "next/link";
import Image from 'next/image';


export default function Navbar() {
  return (
   <>
    <nav className="navbar" style={{backgroundColor:"#ECEBEB"}} >
  <div className="container nav-img" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
    <Link className="navbar-brand nav-brand" href="/news">
      <Image src="/logo.png" alt="Logo" width={170} height={63}/>
    </Link>
  </div>
   </nav>
   </>
  )
}
