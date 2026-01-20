import { EQUIPMENT } from "../model/ABOUT";
import AboutSections from "./AboutSection";

const EquipmentSection = () => {
  return (
    <AboutSections title="장비" muted={false}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {EQUIPMENT.map((item) => (
          <EquipmentItem key={item.category} {...item} />
        ))}
      </div>
    </AboutSections>
  );
};

export default EquipmentSection;

interface EquipmentItem {
  category: string;
  items: readonly string[];
}

const EquipmentItem = ({ category, items }: EquipmentItem) => {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-medium">{category}</h3>
      <ul className="ml-2 list-inside list-disc space-y-1 text-sm">
        {items.map((item) => (
          <li key={item} className="underline-offset-4 last:underline">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
