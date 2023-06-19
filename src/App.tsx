import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Layout/Footer/Footer";
import IndexRouter from "./routers/IndexRouter";

function App() {
  return (
    <>
      <IndexRouter />
      <Footer />
    </>
  )
}

export default App;