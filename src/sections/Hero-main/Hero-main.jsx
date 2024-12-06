import "./Hero-main.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__text">
        <h2 className="hero__text--title">Gentse Luht</h2>
        <p className="hero__text--info">
          If you can breath it, <br /> Gent Can bottle it.
        </p>
      </div>
      <div className="hero__display">
        <img
          className="hero__display--image"
          src="/Variables/Assets/Bottles/bottle-hero-display.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default Hero;
