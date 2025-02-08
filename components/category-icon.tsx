import Image from "next/image";

interface CategoryIconProps {
  icon: string;
  name: string;
  size?: "sm";
}

export function CategoryIcon({ icon, name, size }: CategoryIconProps) {
  const sizeClassName =
    size === "sm" ? "w-[24px] h-[24px]" : "w-[34px] h-[34px]";
  return (
    <div className="flex justify-center items-center ">
      <span
        className={`bg-[#18b272] inline-block ${sizeClassName} rounded-full`}
      >
        {icon ? (
          <Image src={icon} alt={`${name} Icon`} width={50} height={50} />
        ) : (
          <div
            className={`${sizeClassName} rounded-full border border-white border-dashed`}
          ></div>
        )}
      </span>
    </div>
  );
}
