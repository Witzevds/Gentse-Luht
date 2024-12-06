import "./GTK-card.css";

const GTKCard = ({ title, description, image }) => {
  return (
    <div className="gtk-card">
      <img className="gtk-card__image" src={image} alt="" />
      <div className="gtk-card__text">
        <h3 className="gtk-card__text--title">{title}</h3>
        <p className="gtk-card__text--description">{description}</p>
      </div>
      <button className="gtk-card__btn">
        <span>Read more</span> <span>+</span>
      </button>
    </div>
  );
};

export default GTKCard;
