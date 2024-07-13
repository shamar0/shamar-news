import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../public/style.css'

export default function Footer() {
  return (
    <div className="footer mt-5 bg-body-tertiary" >
      <div>
        <h5><Link href="https://shamar-news-git-main-shamars-projects.vercel.app/" className="footer-text" style={{textDecoration:"none"}} >Developed by shamar</Link> </h5>
      </div>

      <div>
      <Link href="https://github.com/shamar0?tab=repositories" target="_blank" className="text-white footer-text" style={{margin: "0 10px",  fontSize: "2em"}}><i className="fa-brands fa-github" style={{color:"#ff6666"}}></i></Link>
      <Link href="https://www.linkedin.com/in/mohammad-shamar-867ba72ab/" target="_blank" className="text-white footer-text" style={{margin: "0 10px",  fontSize: "2em"}}><i className="fab fa-linkedin-in" style={{color:"#ff6666"}}></i></Link>
      </div>
  </div>
    
  )
}
