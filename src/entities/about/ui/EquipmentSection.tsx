import { EQUIPMENT } from "../model/ABOUT";
import AboutSections from "./AboutSection";

interface EquipmentItem {
  category: string;
  items: readonly string[];
}

const EquipmentItem = ({ category, items }: EquipmentItem) => {
  return (
    <div className="space-y-1">
      <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200">{category}</h3>
      <ul className="ml-2 list-inside list-disc space-y-1 text-sm text-slate-600 dark:text-slate-300">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const EquipmentSection = () => {
  return (
    <AboutSections title="장비">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {EQUIPMENT.map((item) => (
          <EquipmentItem key={item.category} {...item} />
        ))}
      </div>
    </AboutSections>
  );
};

export default EquipmentSection;
