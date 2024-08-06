import NavBar from "@/components/NavBar/NavBar";

export default function bookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="fixed inset-0 z-10 dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1]"></div>
      <div className="fixed inset-0 z-20 pointer-events-none flex items-center justify-center dark:bg-black-800 bg-black [mask-image:radial-gradient(ellipse_at_top,transparent_90%,black)]"></div>
      <div className="fixed inset-0 z-30 pointer-events-none flex items-center justify-center dark:bg-purple-800 bg-black [mask-image:radial-gradient(ellipse_at_top,transparent_70%,black)]"></div>
      <div className="relative z-40">
        <NavBar />
        {children}
      </div>
    </div >

  );
}


