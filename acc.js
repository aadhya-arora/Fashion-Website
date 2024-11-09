const likeIcons = document.querySelectorAll(".like");

likeIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    icon.classList.toggle("filled");
  });
});

function myFunction() {
  document.getElementById("more").style.display = "flex";
  document.getElementById("neck").style.height = "1060px";
  document.querySelector(".cta").style.display = "none";
  document.querySelector(".cta4").style.display = "flex";
}

function hide() {
  document.getElementById("more").style.display = "none";
  document.getElementById("neck").style.height = "600px";
  document.querySelector(".cta").style.display = "flex";
  document.querySelector(".cta4").style.display = "none";
}

function myFunction2() {
  document.getElementById("more2").style.display = "flex";
  document.getElementById("watches").style.height = "1060px";
  document.querySelector(".cta1").style.display = "none";
  document.querySelector(".cta5").style.display = "flex";
}

function hide1() {
  document.getElementById("more2").style.display = "none";
  document.getElementById("watches").style.height = "600px";
  document.querySelector(".cta1").style.display = "flex";
  document.querySelector(".cta5").style.display = "none";
}

function myFunction4() {
  document.getElementById("more3").style.display = "flex";
  document.getElementById("Bag").style.height = "1060px";
  document.querySelector(".cta2").style.display = "none";
  document.querySelector(".cta6").style.display = "flex";
}

function hide2() {
  document.getElementById("more3").style.display = "none";
  document.getElementById("Bag").style.height = "600px";
  document.querySelector(".cta2").style.display = "flex";
  document.querySelector(".cta6").style.display = "none";
}

function myFunction6() {
  document.getElementById("more4").style.display = "flex";
  document.getElementById("Ear").style.height = "1060px";
  document.querySelector(".cta3").style.display = "none";
  document.querySelector(".cta7").style.display = "flex";
}

function hide3() {
  document.getElementById("more4").style.display = "none";
  document.getElementById("Ear").style.height = "600px";
  document.querySelector(".cta3").style.display = "flex";
  document.querySelector(".cta7").style.display = "none";
}

const items = [
  "Watches",
  "Handbags",
  "Neckpieces",
  "Earrings",
  "Irridescent-Blue-Lacerta-Neckpiece",
  "Beauteous-Beady-Neckpiece",
  "Delicate-Blue-Neckpiece",
  "Delicate-Emerald-Neckpiece",
  "Enchanting-Delicate-Neckpiece",
  "Pink-Sapphire-Double-Heart-Neckpiece",
  "Delicate-Waves-Diamond-Neckpiece",
  "Glamorous-Infinity-Heart-Neckpiece",
  "Fancy-Leather-Strap-Watch",
  "Rose-Gold-Bracelet-Watch",
  "Acnos-Fancy-Bracelet-Watch",
  "Stylish-Colorful-Hearty-Watch",
  "Elegant-Nature-Greeny-Watch",
  "Delicate-in-Black-Watch",
  "Old-style-Delicate-Watch",
  "Alluring-Hearty-Watch",
  "Black-Flower-Embroidered-Handbag",
  "Alluring-Pink-Handbag",
  "Faux-Leather-Burgandy-Handbag",
  "Formal-In-Grey-Handbag",
  "Beautiful-In-White-Butterfly-Earrings",
  "Delicate-Blue-Hue-Earrings",
  "Elegant-Star-Zirconia-Stud-Earring",
  "Elegant-Emerald-Gold-Earrings",
  "Arizonal-Blue-Studded-Earrings",
  "Multicolored-Brass-And-Pearl-Earrings",
  "Soho-Designer-Drop-Earrings",
];
function SearchBar() {
  const [query, setQuery] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState([]);

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.trim() === "") {
      setFilteredItems([]);
    } else {
      const filtered = items.filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  };

  const handleItemClick = (item) => {
    const section = document.getElementById(item.toLowerCase());
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        style={{
          padding: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginLeft: "-280px",
          fontSize: "14px",
          width: "200px",
        }}
      />
      {filteredItems.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#fff",
            position: "absolute",
            top: "40px",
            left: "-280px",
            width: "200px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          {filteredItems.map((item, index) => (
            <li
              key={index}
              style={{
                padding: "5px",
                cursor: "pointer",
                borderBottom: "1px solid #f0f0f0",
                color: "#333",
                fontSize: "14px",
              }}
              onClick={() => {
                setQuery(item);
                setFilteredItems([]);
                handleItemClick(item);
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#f0f0f0";
                e.target.style.color = "#007bff";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#333";
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

ReactDOM.render(<SearchBar />, document.getElementById("search-bar"));
