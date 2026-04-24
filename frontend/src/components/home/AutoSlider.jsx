import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AutoSlider = ({
  images,
  interval = 4000,
  aspect = "aspect-[16/7]",
  height, 
}) => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!images || images.length === 0) return;

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images, interval]);

  const handleClick = (category) => {
    if (category) {
      navigate(`/category/${category}`);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 px-4 relative group">
      <div className="overflow-hidden rounded-[2rem] shadow-2xl shadow-emerald-900/10 border border-emerald-50">
        <div
          className="flex transition-transform duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((item, i) => (
            <div
              key={i}
              className={`w-full flex-shrink-0 ${
                height ? height : aspect
              } overflow-hidden cursor-pointer relative`}
              onClick={() => handleClick(item.category)}
            >
              <img
                src={`${import.meta.env.BASE_URL}${item.src}`}
                alt={item.category || `slide-${i}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`
              h-2 rounded-full transition-all duration-500
              ${index === i ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}
            `}
          />
        ))}
      </div>
    </div>
  );
};

export default AutoSlider;
