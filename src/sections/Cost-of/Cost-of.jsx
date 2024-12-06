import "./Cost-of.css";

const CostOf = () => {
  return (
    <div className="cost-of">
      <h2 className="cost-of__title">The Cost of Polluted Air.</h2>
      <div className="cost-of__card">
        <div className="cost-of__card--top">
          <ul className="cost-of__card--list">
            <li>
              <img src="/Variables/Assets/icons/skull-icon.svg" alt="" />
              <p>
                <span>9 out of 10 people worldwide</span> breathe polluted air
                every day.
              </p>
            </li>
            <li>
              <img src="/Variables/Assets/icons/world-icon.png" alt="" />
              <p>
                Air pollution kills <span>7 million</span> people annually—more
                than wars or diseases.
              </p>
            </li>
            <li>
              <img src="/Variables/Assets/icons/gas-icon.png" alt="" />
              <p>
                From headaches to heart attacks, bad air is silently{" "}
                <span>destroying lives.</span>
              </p>
            </li>
          </ul>
          <img
            className="cost__of--cigarettes"
            src="/Variables/Assets/cigarettes.png"
            alt=""
          />
        </div>
        <div className="cost-of__card--tag">
          Pollution is the new smoking. <br /> Every puff affects us all
        </div>
      </div>
    </div>
  );
};

export default CostOf;
