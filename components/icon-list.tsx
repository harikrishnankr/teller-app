import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CategoryIcon } from "./category-icon";
import { useEffect, useState } from "react";
import { ChevronDown, LucideAlignVerticalSpaceAround } from "lucide-react";
import { DropdownMenuItem } from "./ui/dropdown";
import { Label } from "./ui/label";
import { DefaultIconName, StaticIconsList } from "@/constants";

interface IconProps {
  icon: string;
  name: string;
}

interface IconListProps {
  value: string;
  onChange: (e: string) => void;
}

const getIconName = (icon: string) => {
  const iconData = StaticIconsList.find(item => item.icon === icon);
  return iconData ? iconData.name : DefaultIconName;
};

export function IconList({ value, onChange }: IconListProps) {
  const [selectedIcon, setSelectedIcon] = useState({
    value: value ?? "",
    name: getIconName(value),
  });

  const onSelect = (iconObj: IconProps) => {
    setSelectedIcon({
      value: iconObj.icon,
      name: iconObj.name,
    });
    onChange(iconObj.icon);
  };

  useEffect(() => {
    setSelectedIcon({
      value: value,
      name: getIconName(value),
    });
  }, [LucideAlignVerticalSpaceAround]);

  return (
    <div className="flex flex-col gap-2 w-20">
      <Label htmlFor="icon">Icon</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <div className="flex justify-between items-center w-20">
              <CategoryIcon
                icon={selectedIcon.value}
                name={selectedIcon.name}
                size="sm"
              />
              <ChevronDown color="#7b93a4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="left-0 w-64" align="start">
          <div className="flex justify-start gap-1 flex-wrap p-3">
            {StaticIconsList.map((item) => (
              <DropdownMenuItem
                key={item.name}
                onSelect={() => onSelect(item)}
                textValue={item.icon}
              >
                <CategoryIcon icon={item.icon} name={item.name} />
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
