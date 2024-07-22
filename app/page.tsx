import MapBox from "../components/Mapbox";
import Navbar from "../components/NavBar";
const Home: React.FC = () => {
  return (
    <div className="w-full h-screen md:items-center md:justify-center bg-black/[0.96] antialised bg-grid/white relative overflow-hidden">
      <Navbar />
      <div className="mt-12 md:mt-20">
        <MapBox />
      </div>
    </div>
  );
};

export default Home;
