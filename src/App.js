import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <Navbar />
      <main><Home /></main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
