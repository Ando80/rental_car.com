import { getTypes } from "@/actions/getType";
import TypeList from "@/components/type/TypeList";

interface HomeProps {
  searchParams: {
    title: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const types = await getTypes(searchParams);

  if (!types) return <div> Pas de categories trouver ...</div>;
  return (
    <div>
      <TypeList types={types} />
    </div>
  );
}
