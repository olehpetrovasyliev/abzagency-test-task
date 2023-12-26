import React from "react";
import Button from "../../ui/Button/Button";
import css from "./Hero.module.scss";

const Hero = () => {
  return (
    <section id="hero">
      <div className={css.heroWrapper}>
        <div className={css.heroContent}>
          <h1 className={css.heroHeading}>
            Test assignment for front-end developer
          </h1>
          <p className={css.heroText}>
            What defines a good front-end developer is one that has skilled
            knowledge of HTML, CSS, JS with a vast understanding of User design
            thinking as they'll be building web interfaces with accessibility in
            mind. They should also be excited to learn, as the world of
            Front-End Development keeps evolving.
          </p>
          <Button
            text="Sign Up"
            func={() => console.log(2)}
            className={css.heroBtn}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
