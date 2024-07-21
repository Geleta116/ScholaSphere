import NavBar from "@/components/NavBar/NavBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1   ">
         <div className=" fixed inset-0 dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1]"></div>
            <div className=" fixed inset-0 pointer-events-none flex items-center justify-center dark:bg-black-800 bg-black [mask-image:radial-gradient(ellipse_at_top,transparent_90%,black)]"></div>
            <div className=" fixed inset-0 pointer-events-none flex items-center justify-center dark:bg-purple-800 bg-black [mask-image:radial-gradient(ellipse_at_top,transparent_70%,black)]"></div>
      <NavBar />

      {children}
      </div>
    // </div>
  );
}
