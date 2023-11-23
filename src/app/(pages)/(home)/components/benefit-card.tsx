import Image from "next/image";
import Link from "next/link";

interface BenefitCardProps {
  benefit: {
    id: string;
    title: string;
    description: string;
    img: string;
  };
}

const BenefitCard = ({ benefit }: BenefitCardProps) => {
  return (
    <Link
      href={"/"}
      className="flex flex-col items-center justify-center w-[350px] h-[380px] bg-black rounded-xl shadow-2xl group hover:-rotate-1 transition-all"
    >
      <div className="max-w-[350px] h-[250px] w-full overflow-hidden rounded-t-xl">
        <Image
          src={benefit.img}
          alt={benefit.title}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover rounded-t-xl group-hover:scale-110 duration-500"
        />
      </div>

      <div className="space-y-2 m-6">
        <h1 className="text-xl font-semibold">{benefit.title}</h1>
        <p className="text-sm line-clamp-3">{benefit.description}</p>
      </div>
    </Link>
  );
};

export default BenefitCard;
