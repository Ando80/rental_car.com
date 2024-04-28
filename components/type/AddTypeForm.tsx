"use client";

import { Engin, Type } from "@prisma/client";

interface AddTypeFormProps {
  type: TypeWithEngin | null;
}
export type TypeWithEngin = Type & {
  engins: Engin[];
};

const AddTypeForm = ({ type }: AddTypeFormProps) => {
  return <div> Add </div>;
};

export default AddTypeForm;
