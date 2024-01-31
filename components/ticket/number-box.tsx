import { colorBase } from "@/lib/schemeColor";
import { tv } from "tailwind-variants";

const numberBox = tv({
  extend: colorBase,
  base: "inline-flex items-center border-2 aspect-square justify-center w-full rounded-lg cursor-pointer  peer-checked:rounded-full transition",
  variants: {
    color: {
      blue: "peer-checked:bg-blue-500 peer-checked:text-blue-100",
      red: "peer-checked:bg-red-500 peer-checked:text-red-100",
      green: "peer-checked:bg-green-500 peer-checked:text-green-100",
      yellow: "peer-checked:bg-yellow-500 peer-checked:text-yellow-100",
      pink: "peer-checked:bg-pink-500 peer-checked:text-pink-100",
      purple: "peer-checked:bg-purple-500 peer-checked:text-purple-100",
      orange: "peer-checked:bg-orange-500 peer-checked:text-orange-100",
      lime: "peer-checked:bg-lime-500 peer-checked:text-lime-100",
    },
    disabled: {
      true: "cursor-not-allowed border-none",
    },
  },

  compoundVariants: [
    {
      color: "blue",
      disabled: true,
      className: "bg-blue-100",
    },
    {
      color: "red",
      disabled: true,
      className: "bg-red-100",
    },
    {
      color: "green",
      disabled: true,
      className: "bg-green-100",
    },
    {
      color: "yellow",
      disabled: true,
      className: "bg-yellow-100",
    },
    {
      color: "pink",
      disabled: true,
      className: "bg-pink-100",
    },
    {
      color: "purple",
      disabled: true,
      className: "bg-purple-100",
    },
    {
      color: "orange",
      disabled: true,
      className: "bg-orange-100",
    },
    {
      color: "lime",
      disabled: true,
      className: "bg-lime-100",
    },
  ],
});

const NumberBox = ({
  title,
  id,
  color,
  value,
  onChange,
}: {
  value: number;
  onChange: () => void;
  title: string;
  id: string;
  color:
    | "blue"
    | "red"
    | "green"
    | "yellow"
    | "pink"
    | "purple"
    | "orange"
    | "lime";
}) => {
  return (
    <div>
      <input
        name="loto"
        type="checkbox"
        className="hidden peer"
        id={id}
        onChange={onChange}
        disabled={title === ""}
        checked={value === 1}
      />
      <label
        htmlFor={id}
        className={numberBox({
          color,
          disabled: title === "",
        })}
      >
        <div className="block">
          <div className="w-full font-semibold">{title}</div>
        </div>
      </label>
    </div>
  );
};

export default NumberBox;
