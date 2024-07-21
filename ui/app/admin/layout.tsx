import { Pacifico } from "next/font/google";
const pacifico = Pacifico({ weight: "400", subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className=" fixed inset-0 dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1]"></div>
      <div className=" fixed inset-0 pointer-events-none flex items-center justify-center dark:bg-black-800 bg-black [mask-image:radial-gradient(ellipse_at_top,transparent_90%,black)]"></div>
      <div className=" fixed inset-0 pointer-events-none flex items-center justify-center dark:bg-purple-800 bg-black [mask-image:radial-gradient(ellipse_at_top,transparent_70%,black)]"></div>
      {children}
    </section>
  );
}
