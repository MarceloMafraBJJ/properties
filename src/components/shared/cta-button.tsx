import { MoveUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { ComponentProps, ReactNode } from "react";

type CtaProps = ComponentProps<"button"> & {
  children: ReactNode;
};

const CtaButton = ({ children, onClick }: CtaProps) => {
  return (
    <Button className="max-w-max gap-2 p-5" onClick={onClick}>
      {children} <MoveUpRight size={16} strokeWidth={3} />
    </Button>
  );
};

export default CtaButton;
