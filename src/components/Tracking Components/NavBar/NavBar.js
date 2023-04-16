export default function NavBar() {
  return (
    <nav className="Tracking--NavBar">
      <a href="/">
        <img
          loading="lazy"
          src="/images/navbar.png"
          className="NavBar--logo"
          alt=""
        ></img>
      </a>
      <img
        alt=""
        src="/images/headerwave.png"
        className="NavBar--background"
      ></img>
    </nav>
  );
}
