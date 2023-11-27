// LoginMod.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LoginMod from './LoginMod';

describe('LoginMod', () => {
  it('renders the heading text', () => {
    // Render the component
    render(<LoginMod />);

    // Find the heading element by its text content
    const headingElement = screen.getByText("Room Repair and Occupancy Control System");

    // Assert that the heading element is present in the document
    expect(headingElement).toBeInTheDocument();
  });

  it("renders the username placeholder text", () => {
    // Render the component
    render(<LoginMod />);

    // Find the input element by its placeholder text
    const inputElement = screen.getByPlaceholderText("Username");

    // Assert that the input element is present in the document
    expect(inputElement).toBeInTheDocument();
  });

  it ("renders the password placeholder text", () => {
    // Render the component
    render(<LoginMod />);

    // Find the input element by its placeholder text
    const inputElement = screen.getByPlaceholderText("Password");

    // Assert that the input element is present in the document
    expect(inputElement).toBeInTheDocument();
  });

  it('Toggle password visibility when "show" button is clicked', () => {
  render(<LoginMod />);

  // Get the password input element
  const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;

  // Initial state: Password should be hidden
  expect(passwordInput.type).toBe('password');

  // Click the "show" button
  const showButton = screen.getByText("Show");
  fireEvent.click(showButton);

  // After clicking "show", password should be visible
  expect(passwordInput.type).toBe('text');

  // Click the "show" button again
  fireEvent.click(showButton);

  // After clicking "show" again, password should be hidden
  expect(passwordInput.type).toBe('password');
  });

  it('renders the login text', () => {
    // Render the component
    render(<LoginMod />);

    // Find the heading element by its text content
    const loginElement = screen.getByText("Login");

    // Assert that the heading element is present in the document
    expect(loginElement).toBeInTheDocument();
  });
});