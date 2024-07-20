import { Pacifico} from "next/font/google";
const pacifico = Pacifico({ weight: '400', subsets: ["latin"]});

export default function AdminLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return <section >{children}</section>;
}
