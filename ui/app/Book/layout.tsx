import NavBar from "@/components/NavBar/NavBar";

export default function BookLayout({
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
