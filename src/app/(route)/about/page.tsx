import { Metadata } from "next";
import { Article } from "@/shared/ui";

export const metadata: Metadata = {
  title: "About",
  description: "About the site",
};

const AboutPage = () => {
  return (
    <Article>
      <h1>About</h1>
      <br />

      <p className="text-xl">About the site</p>
      <hr />
      <br />

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, consequatur sed animi
        laborum praesentium facilis!
      </p>
    </Article>
  );
};

export default AboutPage;
