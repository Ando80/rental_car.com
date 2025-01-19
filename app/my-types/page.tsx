import { getTypesByUserId } from "@/actions/getTypeByUserId";
import NavBar from "@/components/layout/NavBar";
import TypeList from "@/components/type/TypeList";

const MyTypes = async () => {
  const types = await getTypesByUserId();

  if (!types) return <div>Pas de categorie trouver</div>;
  return (
    <div>
      <NavBar />
      <h2 className="text-center font-bold text-indigo-950 text-5xl mt-24">
        Voici vos propriétés
      </h2>
      <TypeList types={types} />
    </div>
  );
};

export default MyTypes;
