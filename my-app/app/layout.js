import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/style.css'
import '@/styles/styleMobile.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'


export const metadata = {
  title: "ProjetWeb3",
  description: "projet web3",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
