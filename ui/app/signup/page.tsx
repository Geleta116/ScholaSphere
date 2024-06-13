import Image from "next/image";
import SignUpForm from "@/components/Form/SignUpForm";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 lg:p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Sign Up
      </h1>
      
      {/* Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-screen-xl">
        {/* Image Container */}
        <div className="hidden sm:flex justify-center items-center w-full lg:w-1/2 mb-8 lg:mb-0">
          <Image
            src="/student-image.png"
            width={500}
            height={500}
            alt="Picture of the hall"
            className="max-w-full h-auto m-auto"
          />
        </div>

        {/* Form Container */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
