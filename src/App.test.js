import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SolveSomeMath from "./SolveSomeMath";

describe("SolveSomeMath component", () => {
	test("renders the component without errors", () => {
		render(<SolveSomeMath />);
		const title = screen.getByText(/Hi, I am Tomide./i);
		expect(title).toBeInTheDocument();
	});

	test("should be able to input problem", () => {
		render(<SolveSomeMath />);
		const input = screen.getByPlaceholderText(/Your math problem/i);
		fireEvent.change(input, { target: { value: "2x + 3x = 35" } });
		expect(input.value).toBe("2x + 3x = 35");
	});

	test("should display the bot's message after inputting a problem", () => {
		render(<SolveSomeMath />);
		const input = screen.getByPlaceholderText(/Your math problem/i);
		fireEvent.change(input, { target: { value: "2x + 3x = 35" } });
		const button = screen.getByRole("send");
		fireEvent.click(button);
		const botMessage = screen.getByText(/here's how i got it/i);
		expect(botMessage).toBeInTheDocument();
	});
});
