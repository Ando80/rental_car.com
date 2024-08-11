import { TypeWithEngin } from "./AddTypeForm";
import TypeCard from "./TypeCard";

const TypeList = ({ types }: { types: TypeWithEngin[] }) => {
  return (
    <div className=" bg-transparent grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pt-8">
      {types.map((type) => (
        <div key={type.id}>
          <TypeCard type={type} />
        </div>
      ))}
    </div>
  );
};

export default TypeList;
