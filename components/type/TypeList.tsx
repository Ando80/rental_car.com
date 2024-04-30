import { Divide } from "lucide-react";
import { TypeWithEngin } from "./AddTypeForm";
import TypeCard from "./TypeCard";

const TypeList = ({ types }: { types: TypeWithEngin[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
      {types.map((type) => (
        <div key={type.id}>
          <TypeCard type={type} />
        </div>
      ))}
    </div>
  );
};

export default TypeList;
