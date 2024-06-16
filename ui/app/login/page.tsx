import Image from "next/image";
import LoginFrom from "@/components/Form/LoginForm";
import { BackgroundBeams } from "@/components/Background/BackgroundBeams";
import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 lg:p-8 shadow-2xl">
      <div className="bg-gradient-to-b from-blue-950 via-purple-900 to-gray-950 p-4 sm:p-18 md:p-24 rounded-xl shadow-lg">
        <h1
          className={`relative text-6xl font-bold text-center mb-20 text-white z-10 ${pacifico.className}  animate__animated animate__zoomInLeft`}
        >
          Log in
        </h1>
        <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-screen-xl z-10">
          <div className="hidden sm:flex justify-center items-center w-full lg:w-1/2 mb-8 lg:mb-0">
            <Image
              src="/student-image.png"
              width={500}
              height={500}
              alt="Picture of the hall"
              className="max-w-full h-auto m-auto"
            />
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <LoginFrom />
          </div>
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
}
