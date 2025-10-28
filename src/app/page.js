import Link from "next/link";
import "./globals.css";
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Hey! I Am Mohammad Shamar</h1>
          <p>Ambitious Software Developer with excellent frontend and backend development skills.</p>
          <div className="hero-buttons">
            <Link href="https://drive.google.com/file/d/11LgOVK1KMuwWkD-gCt9KWN9e3NA9SPed/view?usp=sharing">
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
              AI-powered news aggregation website to centralize multiple news categories into a single platform. Here’s a brief overview of what it offers:
            </p>
        <ul className="list-home">
          <li><strong>Live News Updates:</strong> The website gathers real-time news from several reputable sources (such as Hindustan Times, Aaj Tak, Times of India, India Today etc.), ensuring that users always have access to the latest information.</li>
          <li><strong>Smooth Navigation:</strong> The site is designed to handle large amounts of news efficiently, allowing users to browse through articles easily with features like pagination.</li>
          <li><strong>Modern and Responsive Design:</strong> Built with the latest web technologies, the website offers a sleek and modern look that works well on both desktop and mobile devices.</li>
          <li><strong>Share Button:</strong>  Each news article includes a share button, enabling users to easily share content across social media platforms.</li>
          <li><strong>Category Section:</strong>  Implemented a dynamic category section allowing users to browse news articles by specific categories.</li>
          <li><strong>Search Functionality:</strong>  Integrated a robust search feature enabling users to find news on specific topics or keywords.</li>
          <li><strong>Chatbot:</strong> Implemented voice command features enabling users to navigate the website with commands such as "next page," "previous page," "refresh," "read headlines," "search," "scroll down," and "scroll up," enhancing accessibility and interactivity.</li>             
        </ul>

        </div>
        <div className="link-container">
          <Link href="/news" className="link-home">
            <i className="fas fa-arrow-right arrow"></i> Click here to go
          </Link>
        </div>
      </section>
    </main>
  );
}
