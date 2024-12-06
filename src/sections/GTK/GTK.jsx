import GTKCard from "../../components/GTK-card/GTK-card";
import background1 from "/Variables/Assets/card-backgrounds/card-background-1.png";
import background2 from "/Variables/Assets/card-backgrounds/card-background-2.png";
import background3 from "/Variables/Assets/card-backgrounds/card-background-3.png";
import "./GTK.css";
const GTK = () => {
  return (
    <>
      <div className="gtk">
        <h3 className="gtk__title">Our Mission?</h3>
        <div className="cards">
          <GTKCard
            title="Our Mission?"
            description="To highlight the importance of clean air, one bottle at a time."
            image={background1}
          />
          <GTKCard
            title="Why Gent?

"
            description="“Gent is more than a city it’s a breath of fresh air. From the iconic Gravensteen castle to the lively Overpoort nights."
            image={background2}
          />
          <GTKCard
            title="How It Started"
            description="“What began as a joke—selling our fresh air—became a movement. Today, Gentse Lucht combines wit and awareness to inspire conversations about air quality.”"
            image={background3}
          />
        </div>
      </div>
    </>
  );
};
export default GTK;
