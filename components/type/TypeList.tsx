import { TypeWithEngin } from "./AddTypeForm";
import TypeCard from "./TypeCard";

const TypeList = ({ types }: { types: TypeWithEngin[] }) => {
  return (
    <div className="project-listing flex h-full w-full flex-col items-center">
      <div className="my-6 flex h-full w-full max-w-[1250px] grid-cols-1  flex-wrap justify-center gap-4 md:grid-cols-3 lg:grid xl:my-16">
        {types.map((type) => (
          <div key={type.id}>
            <TypeCard type={type} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypeList;
