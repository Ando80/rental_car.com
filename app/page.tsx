import { getTypes } from "@/actions/getType";
import NavBar from "@/components/layout/NavBar";
import Acceuil from "@/components/molecules/acceuil/Acceuil";
import TypeList from "@/components/type/TypeList";
import Value from "@/components/valuesPage/values";
import style from "./style.module.scss";
import { ReqestBanner } from "@/components/shared/ReqestBanner";
import SubFooter from "@/components/shared/SubFooter";
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
      <div>
        <h1 className={style.title}>Nos categories</h1>
        <TypeList types={types} />
      </div>
      <ReqestBanner />

      <SubFooter />
    </>
  );
}
