import "./global.css";
import GlassNavbar from "../components/GlassNavbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body>
        <GlassNavbar />
        {children}
      </body>
    </html>
  );
}