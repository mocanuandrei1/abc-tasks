import localFont from "next/font/local";
import "./globals.css";

const poppinsRegular = localFont({
  src: "./fonts/Poppins-Regular.woff",
  variable: "--font-poppins-regular",
  weight: "400",
});
const poppinsBold = localFont({
  src: "./fonts/Poppins-Bold.woff",
  variable: "--font-poppins-bold",
  weight: "700",
});

export const metadata = {
  title: "ABC Control Flowchart App",
  description: "O aplicatie pentru controlul fluxului de date in ABC Control",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppinsRegular.variable} ${poppinsBold.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
