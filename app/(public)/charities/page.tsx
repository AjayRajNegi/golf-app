import Charities from "../_components/Charities";
import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";

export default function CharitiesPage() {
  return (
    <>
      <Navbar />
      <Charities className="min-h-screen pt-10" />
      <Footer />
    </>
  );
}
