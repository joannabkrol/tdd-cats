import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import { PetsContext } from "../../Pets/Pets";
import Card from "../Card";
import cats from "../../../mocks/cats.json";

const cardProps = {
  name: "Sydney",
  phone: "111-111-111",
  email: "test@test.com",
  image: {
    url: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80",
    alt: "Cute cat",
  },
  favoured: false,
  updateFavourite: () => {},
  index: 1,
};

const renderCardComponentWithProvider = (props) => {
  render(
    <PetsContext.Provider value={{ cats, setCats: () => {} }}>
      <Card {...props} />
    </PetsContext.Provider>
  );
};

describe("Card", () => {
  test("Should show name of cat", () => {
    renderCardComponentWithProvider(cardProps);
    expect(
      screen.getByRole("heading", { name: /sydney/i })
    ).toBeInTheDocument();
  });

  test("Should show phone number", () => {
    renderCardComponentWithProvider(cardProps);
    expect(screen.getByText(/111-111-111/i)).toBeInTheDocument();
  });

  test("Should show an email", () => {
    renderCardComponentWithProvider(cardProps);
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
  });

  test("Should show an image with correct src", () => {
    renderCardComponentWithProvider(cardProps);
    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test("should show outlined heart", () => {
    renderCardComponentWithProvider(cardProps);
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    renderCardComponentWithProvider({ ...cardProps, favoured: true });
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    renderCardComponentWithProvider(cardProps);
    userEvents.click(screen.getByRole("button"));

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvents.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
