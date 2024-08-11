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
      <h1 className="text-4xl font-bold text-neutral-800 pt-3">
        Nos Catégories
      </h1>

      <TypeList types={types} />
    </div>
  );
}
