import { RiFacebookBoxFill, RiTelegramFill } from "@remixicon/react";

export default function Footer() {
  return (
    <footer className=" text-gray-400 py-4 ">
      <div className="container mx-auto flex flex-col items-center gap-2">
        <p className="text-sm">
          © <span>Copyright</span>{" "}
          <strong className="text-blue-400">MooNyDev</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/profile.php?id=100034549472905&mibextid=ZbWKwL"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition duration-300"
          >
            <RiFacebookBoxFill size={24} />
          </a>
          <a
            href="https://t.me/+85578731099"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-blue-500 transition duration-300"
          >
            <RiTelegramFill size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
