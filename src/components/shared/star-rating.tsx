import { Star } from "lucide-react";

const StarRating = ({ assessment }: { assessment: number }) => {
  const roundedAssessment = Math.round(Math.min(Math.max(0, assessment), 5));

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => index < roundedAssessment);
  };

  return (
    <div className="flex gap-1">
      {renderStars().map((filled, index) => (
        <Star
          key={index}
          size={20}
          className={
            filled ? "fill-primary text-primary" : "fill-white text-white"
          }
        />
      ))}
    </div>
  );
};

export default StarRating;
