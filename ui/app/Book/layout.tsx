import NavBar from "@/components/NavBar/NavBars";

export default function bookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1">
      <NavBar />
      {children}
    </div>
  );
}


