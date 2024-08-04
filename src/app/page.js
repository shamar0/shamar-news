import Link from "next/link";
import "./globals.css";
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Hey! I Am Mohammad Shamar</h1>
          <p>Ambitious Software Developer with excellent frontend and backend development skills.</p>
          <div className="hero-buttons">
            <Link href="https://drive.google.com/file/d/14U3ywfhnmcNWI-akd9J_KKT8WALrSQu8/view">
              Resume
            </Link>
          </div>
          <div className="hero-icons">
            <Link href="https://github.com/shamar0">
              <i className="fab fa-github"></i>
            </Link>
            <Link href="https://www.linkedin.com/in/mohammad-shamar-867ba72ab/">
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
        </div>
        <Image src="/profile.jpeg" alt="Profile" className="profile-image-hero" width={220} height={220}/>
     
        <div className="profile-section hero-section">
            <p className="paragraph-home">
              It is a news website that brings together live news from various sources into one user-friendly platform. Here’s a brief overview of what it offers:
            </p>
        <ul className="list-home">
          <li><strong>Live News Updates:</strong> The website gathers real-time news from several reputable sources, ensuring that users always have access to the latest information.</li>
          <li><strong>Smooth Navigation:</strong> The site is designed to handle large amounts of news efficiently, allowing users to browse through articles easily with features like pagination.</li>
          <li><strong>Modern and Responsive Design:</strong> Built with the latest web technologies, the website offers a sleek and modern look that works well on both desktop and mobile devices.</li>
          <li><strong>User Login and Signup:</strong> Provides user authentication features, allowing users to create accounts, log in, and access personalized features.</li>
          <li><strong>Article Saving:</strong> Logged-in users can save specific articles for future reference, enhancing the user experience and convenience.</li>
          <li><strong>Share Button:</strong>  Each news article includes a share button, enabling users to easily share content across social media platforms.</li>
          <li><strong>Voice Assistant Integration(using chrome extension):</strong>Made a chrome extension by using it users can navigate the website using voice commands such as "next page or go to next page", "previous page", "refresh", "scroll down", and "scroll up", making it more accessible and interactive.</li>          
        </ul>

        </div>
        <div className="link-container">
          <Link href="https://shamar-news-53j6.vercel.app/news" className="link-home">
            <i className="fas fa-arrow-right arrow"></i> Click here to go
          </Link>
        </div>
      </section>
    </main>
  );
}
