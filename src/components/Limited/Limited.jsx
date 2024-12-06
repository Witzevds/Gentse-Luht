import "./Limited.css";

const Limited = ({
  image = "",
  price = "",
  name = "",
  info = "",
  colorClass = "",
  detail = "",
} = {}) => {
  return (
    <div className={`limited ${colorClass}`}>
      <h1 className="limited__title">Limited edition</h1>
      <div className="limited__mid">
        <p className="limited__mid--name">{name}</p>
        <img className="limited__mid--image" src={image} alt="" />
        <div className="limited__mid--choices">
          <h3 className="limited__mid--choices--name">Sizes</h3>
          <div className="limited__mid--size">
            <div className={`limited__mid--choice ${detail}`}>500ml</div>
            <div className={`limited__mid--choice ${detail}`}>1000ml</div>
            <div className={`limited__mid--choice ${detail}`}>1500ml</div>
          </div>

          <h3 className="limited__mid--choices--name">Quality</h3>
          <div className="limited__mid--quality">
            <div className={`limited__mid--choice ${detail}`}>Light</div>
            <div className={`limited__mid--choice ${detail}`}>Pure</div>
            <div className={`limited__mid--choice ${detail}`}>Supreme</div>
          </div>
        </div>
      </div>

      <div className="limited__bottom">
        <div className="limited__bottom--left">
          <p className="limited__bottom--info">{info}</p>
        </div>

        <p className="limited__bottom--price">{price}</p>
        <div className="limited__bottom--right">
          <button className="limited__bottom--button">Buy now</button>
        </div>
      </div>
    </div>
  );
};

export default Limited;
