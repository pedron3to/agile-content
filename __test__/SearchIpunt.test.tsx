import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SearchInput, {
  SearchInputProps,
} from "../src/components/Input/SearchInput";

describe("SearchInput component", () => {
  const defaultProps: SearchInputProps = {
    value: "",
    onChange: () => {},
  };

  test("renders without errors", () => {
    render(<SearchInput {...defaultProps} />);
    expect(
      screen.getByPlaceholderText("Search for animals...")
    ).toBeInTheDocument();
  });

  test("calls the onChange callback with the updated input value", () => {
    const onChangeMock = jest.fn();
    const inputValue = "Cat";

    render(<SearchInput onChange={onChangeMock} value={inputValue} />);

    const inputElement = screen.getByPlaceholderText("Search for animals...");

    fireEvent.change(inputElement, { target: { value: inputValue } });

    expect(inputElement).toHaveValue(inputValue);
  });

  test("calls onEnter callback when Enter key is pressed", () => {
    const onEnterMock = jest.fn();
    render(<SearchInput {...defaultProps} onEnter={onEnterMock} />);

    const inputElement = screen.getByPlaceholderText("Search for animals...");
    fireEvent.keyDown(inputElement, { key: "Enter" });

    expect(onEnterMock).toHaveBeenCalled();
  });

  test("it calls the setIsSelected callback when Escape key is pressed", () => {
    const setIsSelectedMock = jest.fn();

    render(<SearchInput {...defaultProps} setIsSelected={setIsSelectedMock} />);

    const inputElement = screen.getByPlaceholderText("Search for animals...");

    fireEvent.keyDown(inputElement, { key: "Escape" });

    expect(setIsSelectedMock).toHaveBeenCalledTimes(1);
    expect(setIsSelectedMock).toHaveBeenCalledWith(false);
  });
});
