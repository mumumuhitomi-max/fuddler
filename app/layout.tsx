import "./global.css";
import GlassNavbar from "../components/GlassNavbar";

export default function RootLayout({ children }) {
  return (
    <html lang="zh">
      <body>
        <GlassNavbar />
        {children}
      </body>
    </html>
  );
}