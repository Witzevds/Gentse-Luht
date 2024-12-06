import "./Shop-card.css";

const ShopCard = ({ img = "", price = "", date = "" }) => {
  return (
    <div className="shop-card">
      <img className="shop-card__image" src={img} alt="item picture" />
      <div className="shop-card__information">
        <div className="shop-card__information--left">
          <h4 className="shop-card__information--name">Luht {date}</h4>
          <p className="shop-card__information--data">Luht bottled in {date}</p>
          <p className="shop-card__information--price">{price}</p>
        </div>
        <div className="shop-card__information--basket">
          <img src="/Variables/Assets/black-Shop.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
