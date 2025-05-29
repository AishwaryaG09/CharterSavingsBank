import "./HeaderTab.css";
import logo from "../assets/standard-chartered-trustmark.svg";
const HeaderTab = () => {
  return (
    <>
      <header className="header">
        <a className="logo" href="https://www.sc.com/in/" target="_blank">
          <img src={logo} className="logo" alt="Vite logo" />
          <span>Standard Chartered</span>
        </a>
      </header>
    </>
  );
};

export default HeaderTab;
