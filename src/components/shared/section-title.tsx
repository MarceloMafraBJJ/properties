import { ReactNode } from "react";

const SectionTitle = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <h1 className="font-bold text-3xl" {...props}>
      {children}
    </h1>
  );
};

export default SectionTitle;
