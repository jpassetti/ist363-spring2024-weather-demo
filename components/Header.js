import styles from "./Header.module.scss";

import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.header}>
      <Image
        src="/logo-weather.svg"
        alt="Weather logo"
        width={50}
        height={50}
      />
      <h1>IST 363 Weather App</h1>
    </header>
  );
};
export default Header;
