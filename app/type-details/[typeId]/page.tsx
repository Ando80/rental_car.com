import { getTypeById } from "@/actions/getTypeById";
import TypeDetailsClient from "@/components/type/TypeDetailsClient";

interface TypeDetailsProps {
  params: {
    typeId: string;
  };
}

const TypeDetails = async ({ params }: TypeDetailsProps) => {
  const type = await getTypeById(params.typeId);

  if (!type) return <div>Oop! La categorie n as pas ete trouver</div>;

  return (
    <div>
      <TypeDetailsClient type={type} />
    </div>
  );
};

export default TypeDetails;
