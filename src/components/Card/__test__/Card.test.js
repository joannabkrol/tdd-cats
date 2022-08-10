import { render, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import Card from "../Card";

const cardProps = {
  name: "Sydney",
  phone: "111-111-111",
  email: "test@test.com",
  image: {
    url: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1336&q=80",
    alt: "Cute cat",
  },
  favoured: false,
};

describe("Card", () => {
  test("Should show name of cat", () => {
    render(<Card {...cardProps} />);
    expect(
      screen.getByRole("heading", { name: /sydney/i })
    ).toBeInTheDocument();
  });

  test("Should show phone number", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/111-111-111/i)).toBeInTheDocument();
  });

  test("Should show an email", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
  });

  test("Should show an image with correct src", () => {
    render(<Card {...cardProps} />);
    expect(screen.getByAltText(/cute cat/i).src).toBe(cardProps.image.url);
  });

  test("should show outlined heart", () => {
    render(<Card {...cardProps} />);
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });

  test("should show filled heart", () => {
    render(<Card {...cardProps} favoured={true} />);
    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();
  });

  test("should toggle heart status", () => {
    render(<Card {...cardProps} />);
    userEvents.click(screen.getByRole("button"));

    expect(screen.queryByAltText(/outlined heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/filled heart/i)).toBeInTheDocument();

    userEvents.click(screen.getByRole("button"));
    expect(screen.queryByAltText(/filled heart/i)).not.toBeInTheDocument();
    expect(screen.getByAltText(/outlined heart/i)).toBeInTheDocument();
  });
});
