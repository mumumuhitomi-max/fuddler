"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  return (
    <nav className="flex space-x-8 p-4 text-lg font-semibold text-white bg-gray-800">
      <Link href="/palyou">
        <span className={path === "/palyou" ? "underline" : ""}>
          盘友操作
        </span>
      </Link>
      <Link href="/today">
        <span className={path === "/today" ? "underline" : ""}>
          今日操作
        </span>
      </Link>
      <Link href="/analysis">
        <span className={path === "/analysis" ? "underline" : ""}>
          投资分析
        </span>
      </Link>
    </nav>
  );
}