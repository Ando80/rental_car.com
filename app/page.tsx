import { getTypes } from "@/actions/getType";
import NavBar from "@/components/layout/NavBar";
import Acceuil from "@/components/molecules/acceuil/Acceuil";
import TypeList from "@/components/type/TypeList";
import Value from "@/components/valuesPage/values";

interface HomeProps {
  searchParams: {
    title: string;
  };
}

export default async function Home({ searchParams }: HomeProps) {
  const types = await getTypes(searchParams);

  if (!types) return <div> Pas de categories trouver ...</div>;
  return (
    <>
      <div>
        <NavBar />
        <Acceuil />
        <Value />
      </div>

      {/*<div>
        <h1 className="text-4xl font-bold text-neutral-800 pt-3">
          Nos Catégories
        </h1>

        <TypeList types={types} />
      </div>*/}
    </>
  );
}
