import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Mina Lee" } });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "mina@example.com" },
  });
  fireEvent.change(screen.getByLabelText("Tell us about the project"), {
    target: { value: "We need a new identity for a cultural program." },
  });
}

describe("contact form", () => {
  it("associates_required_field_errors_with_empty_inputs", () => {
    render(<ContactForm />);
    fireEvent.submit(screen.getByRole("form", { name: "Project inquiry" }));

    expect(screen.getByLabelText("Name")).toHaveAccessibleDescription("Please enter your name.");
    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(
      "Please enter your email address.",
    );
    expect(screen.getByLabelText("Tell us about the project")).toHaveAccessibleDescription(
      "Please tell us a little about the project.",
    );
  });

  it("rejects_an_invalid_email_address", () => {
    render(<ContactForm />);
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "not-an-email" } });
    fireEvent.submit(screen.getByRole("form", { name: "Project inquiry" }));

    expect(screen.getByLabelText("Email")).toHaveAccessibleDescription(
      "Please enter a valid email address.",
    );
  });

  it("submits_from_the_keyboard_and_builds_an_encoded_inquiry_email", () => {
    const onSend = vi.fn();
    render(<ContactForm onSend={onSend} />);
    fillRequiredFields();
    fireEvent.change(screen.getByLabelText("Company"), { target: { value: "Common Field" } });

    fireEvent.keyDown(screen.getByLabelText("Company"), { key: "Enter", code: "Enter" });

    expect(onSend).toHaveBeenCalledTimes(1);
    const href = onSend.mock.calls[0][0] as string;
    expect(href).toContain("mailto:hello@endlls.studio?");
    expect(href).toContain("Mina%20Lee");
    expect(href).toContain("Common%20Field");
    expect(href).toContain("new%20identity%20for%20a%20cultural%20program");
  });
});
