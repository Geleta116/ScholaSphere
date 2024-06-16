import { Pacifico} from "next/font/google";
const pacifico = Pacifico({ weight: '400', subsets: ["latin"]});

export default function LoginLayout({
  children, 
}: {
  children: React.ReactNode;
}) {
  return <section >{children}</section>;
}
