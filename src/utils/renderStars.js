import { MdStarOutline, MdStarRate } from "react-icons/md";

export const renderStars = (rating) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < rating) {
      stars.push(<MdStarRate className="text-[gold] text-lg" key={i} />);
    } else {
      stars.push(<MdStarOutline className="text-gray-400 text-lg" key={i} />);
    }
  }

  return stars;
};
