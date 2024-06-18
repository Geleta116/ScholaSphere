import { BackgroundBeams } from "@/components/Background/BackgroundBeams";
import NavBar from "@/components/NavBar/NavBar";

export default function Page() {
  return (
    <div className=" w-screen h-screen dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center text-white">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] bg-gradient-to-b from-blue-950 via-purple-900 to-gray-950 "></div>
      working
    </div>
  );
}
