import { getTypeById } from "@/actions/getTypeById";
import NavBar from "@/components/layout/NavBar";
import AddTypeForm from "@/components/type/AddTypeForm";
import { auth } from "@clerk/nextjs/server";

interface TypePageProps {
  params: {
    typeId: string;
  };
}
const Type = async ({ params }: TypePageProps) => {
  const type = await getTypeById(params.typeId);
  const { userId } = auth();

  if (!userId) return <div>Not authenticated...</div>;
  if (type && type.userId !== userId) return <div>Access denied...</div>;
  return (
    <div>
      <NavBar />
      <AddTypeForm type={type} />
    </div>
  );
};

export default Type;
