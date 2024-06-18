import NavBar from "@/components/NavBar/NavBar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex-1  bg-gradient-to-b ">
      <NavBar />
      {children}
    </main>
  );
}
