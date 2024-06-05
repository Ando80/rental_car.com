import { getLocationByTypeOwnerId } from "@/actions/getLocationsByTypeOwnerId";
import { getLocationByUserId } from "@/actions/getLocationsByUserId";
import MyLocationClient from "@/components/location/MyLocationsClient";

const MyLocations = async () => {
  const locationsFromVisitors = await getLocationByTypeOwnerId();
  const locationIHaveMade = await getLocationByUserId();

  if (!locationsFromVisitors && !locationIHaveMade)
    return <div>Pas de Location trouver</div>;
  return (
    <div className="flex flex-col gap-10">
      {!!locationIHaveMade?.length && (
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-6 mt-2">
            Voici les locations faites par vous
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {locationIHaveMade.map((location) => (
              <MyLocationClient key={location.id} location={location} />
            ))}
          </div>
        </div>
      )}
      {!!locationsFromVisitors?.length && (
        <div>
          <h2 className="text-xl md:text-2xl font-semibold mb-6 mt-2">
            Voici les locations faites par vos visiteurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {locationsFromVisitors.map((location) => (
              <MyLocationClient key={location.id} location={location} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLocations;
