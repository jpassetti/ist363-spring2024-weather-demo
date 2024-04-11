import "../sass/global.scss";

import Header from "../components/Header";

export const metadata = {
  title: "IST 363 Weather App",
  description: "A weather app built with React and OpenWeatherMap API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
