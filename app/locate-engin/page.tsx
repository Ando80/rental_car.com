import NavBar from "@/components/layout/NavBar";
import LocationEnginClient from "@/components/location/LocationEnginClient";

const LocateEngin = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="p-8">
        <LocationEnginClient />
      </div>
    </>
  );
};

export default LocateEngin;
