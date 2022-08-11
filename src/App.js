import "./App.css";
import Cards from "./components/Cards/Cards";
import cats from "./mocks/cats.json";

function App() {
  return (
    <div>
      {/* <Card
        name="Sydney"
        phone="111-111-111"
        email="test@test.com"
        image={{
          url: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80",
          alt: "Cute cat",
        }}
        favoured={false}
      /> */}
      <Cards cats={cats} />
    </div>
  );
}

export default App;
