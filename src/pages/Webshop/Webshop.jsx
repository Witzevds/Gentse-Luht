import Header from "../../components/Header/Header";
import Limited from "../../components/Limited/Limited";
import Originals from "../../sections/Originals/Originals";
import "./Webshop.css";
const Webshop = () => {
  return (
    <>
      <div className="Limited-wrap">
        <Limited
          image="/Variables/Assets/Bottles/Overpoort-bottle-group.png"
          name="Gentse Overse Luht"
          info="Breath with responsibility Alcohol infused / Gold infused"
          price="$199.99"
          colorClass="overpoort"
          detail="detail-color__overpoort"
        />
        <Limited
          image="/Variables/Assets/Bottles/kerst-bottle-group.png"
          name="Gentse Kerst Luht"
          info="Breath with responsibility Mint infused / Jenever infused"
          price="$50,55"
          colorClass="christmas"
          detail="detail-color__christmas"
        />

        <Originals />
      </div>
    </>
  );
};

export default Webshop;
