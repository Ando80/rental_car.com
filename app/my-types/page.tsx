import { getTypesByUserId } from "@/actions/getTypeByUserId";
import TypeList from "@/components/type/TypeList";

const MyTypes = async () => {
  const types = await getTypesByUserId();

  if (!types) return <div>Pas de categorie trouver</div>;
  return (
    <div>
      <h2 className="text-exl font-semibold">Voici vos propriétés</h2>
      <TypeList types={types} />
    </div>
  );
};

export default MyTypes;
