import "../styles/components/Header.css";

type HeaderProps = {
  onAddPageClick: () => void;
};

function Header(props: HeaderProps) {
  return (
    <header className="header">
      <div className="name">My Book Maker</div>
      <div className="add-page" onClick={props.onAddPageClick}>
        Add Page
      </div>
    </header>
  );
}

export default Header;
