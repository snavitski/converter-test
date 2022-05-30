import { cleanup, render, screen } from "@testing-library/react";
import ResultBox from "./ResultBox";
import "@testing-library/jest-dom/extend-expect";
import { formatAmountInCurrency } from "../../utils/formatAmountInCurrency";

describe("Component ResultBox", () => {
	it("should render without crushing", () => {
		render(<ResultBox from='PLN' to='USD' amount={100} />);
	});

	const testCases = [100, 200, 3.5, 21];

	it("should render proper info about conversion when PLN -> USD", () => {
		for (const testAmount of testCases) {
			render(<ResultBox from='PLN' to='USD' amount={testAmount} />);
			const output = screen.getByTestId("output");
			expect(output).toHaveTextContent(
				`${formatAmountInCurrency(
					testAmount,
					"PLN"
				)} = ${formatAmountInCurrency(testAmount / 3.5, "USD")}`.replace(
					/\u00a0/g,
					" "
				)
			);
			cleanup();
		}
	});

	it("should render proper info about conversion when USD -> PLN", () => {
		for (const testAmount of testCases) {
			render(<ResultBox from='USD' to='PLN' amount={testAmount} />);
			const output = screen.getByTestId("output");
			expect(output).toHaveTextContent(
				`${formatAmountInCurrency(
					testAmount,
					"USD"
				)} = ${formatAmountInCurrency(testAmount * 3.5, "PLN")}`.replace(
					/\u00a0/g,
					" "
				)
			);
			cleanup();
		}
	});

	it("should render proper info about conversion when PLN -> PLN", () => {
		for (const testAmount of testCases) {
			render(<ResultBox from='PLN' to='PLN' amount={testAmount} />);
			const output = screen.getByTestId("output");
			expect(output).toHaveTextContent(
				`${formatAmountInCurrency(
					testAmount,
					"PLN"
				)} = ${formatAmountInCurrency(testAmount, "PLN")}`.replace(
					/\u00a0/g,
					" "
				)
			);
			cleanup();
		}
	});

	it("should render proper info about conversion when USD -> USD", () => {
		for (const testAmount of testCases) {
			render(<ResultBox from='USD' to='USD' amount={testAmount} />);
			const output = screen.getByTestId("output");
			expect(output).toHaveTextContent(
				`${formatAmountInCurrency(
					testAmount,
					"USD"
				)} = ${formatAmountInCurrency(testAmount, "USD")}`.replace(
					/\u00a0/g,
					" "
				)
			);
			cleanup();
		}
	});

	it('should render "Wrong value.." info about conversion when value is lower than zero', () => {
		const testCasesMinusAmount = [
			{ amount: "-100", from: "PLN", to: "USD" },
			{ amount: "-100", from: "USD", to: "PLN" },
			{ amount: "-100", from: "PLN", to: "PLN" },
			{ amount: "-100", from: "USD", to: "USD" },
			{ amount: "-2.5", from: "PLN", to: "USD" },
			{ amount: "-2.5", from: "USD", to: "PLN" },
			{ amount: "-2.5", from: "PLN", to: "PLN" },
			{ amount: "-2.5", from: "USD", to: "USD" },
		];

		for (const testAmount of testCasesMinusAmount) {
			render(
				<ResultBox
					from={testAmount.from}
					to={testAmount.to}
					amount={testAmount.amount}
				/>
			);

			const output = screen.getByTestId("output");
			expect(output).toHaveTextContent("Wrong value...");
			cleanup();
		}
	});
});
