import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import NavbarWrapper from "./_components/navbarWrapper";
import FooterWrapper from "./_components/footerWrapper";


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
        <FooterWrapper/>
      </body>
    </html>
  );
}
