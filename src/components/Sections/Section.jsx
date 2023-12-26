import React from "react";
import css from "./Section.module.css";

const Section = ({ children }) => {
  return (
    <section className={css.section}>
      <div className={css.wrapper}>{children}</div>
    </section>
  );
};

export default Section;
