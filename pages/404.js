import Image from "next/image";
import notFoundImage from "../public/images/not-found.svg";

export default function Custom404() {
  return (
    <div className="h-screen grid place-items-center">
      <div className="flex sm:flex-col lg:flex-row">
        <Image src={notFoundImage} height="500" width="500" alt="not found" />
        <div className="flex flex-col justify-center ml-7">
          <p className="lg:text-7xl font-bold mb-2 md:text-4xl sm:text-center lg:text-left">
            404 Not Found
          </p>
          <p className="lg:text-xl md:text-base sm:text-center lg:text-left">
            {"We can't seem to find the page you're looking for"}
          </p>
        </div>
      </div>
    </div>
  );
}
