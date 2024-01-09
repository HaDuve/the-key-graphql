import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app", () => {
  render(<App />);
  const linkElement = screen.getByText(/The Key graphql react app/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders login form", () => {
  render(<App />);
  const linkElement = screen.getByText(/Login Form/i);
  expect(linkElement).toBeInTheDocument();
});
