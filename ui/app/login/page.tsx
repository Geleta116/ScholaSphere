import Image from "next/image";
import LoginFrom from "@/components/Form/LoginForm";

export default function Page() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-4 lg:p-8 bg-gray-950">
      <h1 className="relative text-4xl font-bold text-center mb-8 text-white z-10">
        Login
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
  );
}
