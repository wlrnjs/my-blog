import { ABOUT_INTERESTS, ABOUT_REASON, ABOUT_STYLE } from "../model/ABOUT";
import AboutSection from "./AboutSection";
import EquipmentSection from "./EquipmentSection";
import CommitGraphSection from "./CommitGraphSection";

const AboutContent = () => {
  return (
    <div className="space-y-5">
      <AboutSection title="소개">
        <p className="dark:text-white">{ABOUT_REASON}</p>
      </AboutSection>

      <AboutSection title="관심 분야">
        <ul className="ml-2 list-inside list-disc space-y-1 text-sm dark:text-white">
          {ABOUT_INTERESTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </AboutSection>

      <AboutSection title="개발 스타일 / 가치관">
        <p className="dark:text-white">{ABOUT_STYLE}</p>
      </AboutSection>

      <EquipmentSection />

      <CommitGraphSection />
    </div>
  );
};

export default AboutContent;
