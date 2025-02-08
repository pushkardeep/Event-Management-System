import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../redux/slices/Filter.slice";
import { setIsFilterBoxOpen } from "../redux/slices/ui.slice";

// Icons
import { FaMusic, FaPaintBrush, FaFootballBall } from "react-icons/fa";
import { RiPsychotherapyFill } from "react-icons/ri";
import { RxValueNone } from "react-icons/rx";

const categories = [
  { label: "None", value: "", Icon: RxValueNone },
  { label: "Music", value: "music", Icon: FaMusic },
  { label: "Art", value: "art", Icon: FaPaintBrush },
  { label: "Sports", value: "sports", Icon: FaFootballBall },
  { label: "Others", value: "other", Icon: RiPsychotherapyFill },
];

const FilterCategory = () => {
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.filter);

  const handleClick = (value) => {
    dispatch(setCategory(value));
    dispatch(setIsFilterBoxOpen(false));
  };

  return (
    <div className="w-[150px] shadow-md border bg-gray-800 border-gray-700 absolute top-[130%] z-40 left-[-40%] rounded-lg p-3">
      <h1 className="text-white font-medium mb-2">Filter</h1>
      <hr className="border-white/20 mb-2" />
      <div className="flex flex-col gap-2">
        {categories.map(({ label, value, Icon }) => (
          <button
            key={value}
            onClick={() => handleClick(value)}
            className={`flex items-center gap-2 text-white px-2 py-1 rounded-md hover:bg-gray-600 ${
              category === value ? "bg-gray-600" : ""
            } transition cursor-pointer`}
          >
            <Icon />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterCategory;
