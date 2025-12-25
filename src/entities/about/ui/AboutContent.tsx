import AboutSection from "./AboutSection";
import EquipmentSection from "./EquipmentSection";
import CommitGraphSection from "./CommitGraphSection";
import { ABOUT_INTERESTS, ABOUT_REASON, ABOUT_STYLE } from "../model/ABOUT";

const AboutContent = () => {
  return (
    <div className="space-y-5">
      <AboutSection title="소개" muted={false}>
        <p>{ABOUT_REASON}</p>
      </AboutSection>

      <AboutSection title="관심 분야" muted={false}>
        <ul className="ml-2 list-inside list-disc space-y-1">
          {ABOUT_INTERESTS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </AboutSection>

      <AboutSection title="개발 스타일 / 가치관" muted={false}>
        <p>{ABOUT_STYLE}</p>
      </AboutSection>

      <EquipmentSection />

      <CommitGraphSection />
    </div>
  );
};

export default AboutContent;
