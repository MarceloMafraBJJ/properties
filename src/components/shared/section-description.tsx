import { ReactNode } from "react";

const SectionDescription = ({
  children,
  ...props
}: {
  children: ReactNode;
}) => {
  return (
    <p className="text-justify leading-relaxed break-words" {...props}>
      {children}
    </p>
  );
};

export default SectionDescription;
