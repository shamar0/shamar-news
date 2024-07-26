import "./globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarWrapper from "./_components/navbarWrapper";

export const metadata = {
  title: "shamar news",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>
          <NavbarWrapper />
        <div className="main-content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
