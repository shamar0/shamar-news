import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../../public/style.css'
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="footer mt-5 py-5  text-white" >
    <div className="container" >
      <div className="row">
        <div className="col-md-4" style={{marginTop:"0.6rem"}}>
          <div className="footer-logo">
            <Image src="/MS2.png" alt="Logo" width={170} height={63} />
          </div>
        </div>
        <div className="col-md-4">
          <Link href="mailto:afzalshamar@gmail.com"  className="footer-logo"><img src="https://assets.inshorts.com/website_assets/images/contact_icon.png"></img></Link>
        </div>
        <div className="col-md-4 text-center">
          <div className="social-icons">
            <Link href="https://github.com/shamar0?tab=repositories" target="_blank" className="text-white" style={{margin: "0 10px",  fontSize: "1.8em"}}><i className="fa-brands fa-github"></i></Link>
            <Link href="https://www.linkedin.com/in/mohammad-shamar-867ba72ab/" target="_blank" className="text-white" style={{margin: "0 10px",  fontSize: "1.8em"}}><i className="fab fa-linkedin-in"></i></Link>
          </div>
        </div>
      </div>
      <div className="row mt-3 ">
        <div className="col-md-4">
          <p>shamarnews <span style={{fontWeight:"150"}}>Pte. Ltd. &copy;COPYRIGHT 2024</span></p>
        </div>
      </div>
    </div>
  </div>
    
  )
}
