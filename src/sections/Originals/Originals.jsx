import ShopCard from "../../components/Shop-card/Shop-card";
import "./Originals.css";
const Originals = () => {
  return (
    <>
      <h1 className="originals">Originals</h1>
      <div className="shop">
        <ShopCard
          img="/Variables/Assets/Bottles/Luht2020.png"
          price="$20.00"
          date="2020"
        />
        <ShopCard
          img="/Variables/Assets/Bottles/Luht1985.png"
          price="$35.00"
          date="1985"
        />
        <ShopCard
          img="/Variables/Assets/Bottles/Luht1960.png"
          price="$45.00"
          date="1960"
        />
      </div>
    </>
  );
};

export default Originals;
