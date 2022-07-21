import { ToastProvider } from "@/contexts/ToastContext";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Toast } from "./Toast";

describe("Toast component", () => {
  it("should render correctly", () => {
    render(
      <ToastProvider>
        <Toast styleType="success" title="Toast Test" role="alertdialog" />
      </ToastProvider>
    );

    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});
