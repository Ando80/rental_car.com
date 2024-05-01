import { getLocations } from "@/actions/getLocations";
import { getTypeById } from "@/actions/getTypeById";
import TypeDetailsClient from "@/components/type/TypeDetailsClient";

interface TypeDetailsProps {
  params: {
    typeId: string;
  };
}

const TypeDetails = async ({ params }: TypeDetailsProps) => {
  const type = await getTypeById(params.typeId);
  if (!type) return <div>Ooops! this type with the given id not found</div>;
  const locations = await getLocations(type.id);

  if (!type) return <div>Oop! La categorie n as pas ete trouver</div>;

  return (
    <div>
      <TypeDetailsClient type={type} locations={locations} />
    </div>
  );
};

export default TypeDetails;
