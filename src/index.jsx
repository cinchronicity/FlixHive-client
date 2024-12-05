import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view.jsx";
import Container from "react-bootstrap/Container";
import { GlowingHexagon } from "./components/glowing-hexagon/glowing-hexagon.jsx";

// import "bootstrap/dist/css/bootstrap.min.css"; remove to add custom styling
// Import statement to indicate that you need to bundle `./index.scss`
import "./index.scss";
import { GlowingHexagon } from "./components/glowing-hexagon/glowing-hexagon.jsx";

// Main component (will eventually use all the others)
const FlixHiveApplication = () => {
  return (
    <div className="app-container">
      <GlowingHexagon className="content-container" />
      <Container>
        <MainView />
      </Container>
    </div>
  );
};

// Finds the root of your app (the div with the id "root")
const container = document.querySelector("#root");
const root = createRoot(container);

// Tells React to render your app in the root DOM element
root.render(<FlixHiveApplication />);
