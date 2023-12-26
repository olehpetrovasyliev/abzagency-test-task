import React from "react";
import css from "./Section.module.css";

const Section = ({ children, id }) => {
  return (
    <section className={css.section} id={id}>
      <div className={css.wrapper}>{children}</div>
    </section>
  );
};

export default Section;
