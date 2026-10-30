import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { buildInquiryLink, ContactForm } from "./contact-form";

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
    const onSend = vi.fn();
    render(<ContactForm send={onSend} />);
    fireEvent.submit(screen.getByRole("form", { name: "Project inquiry" }));

    expect(onSend).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Name")).toHaveFocus();
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

  it("submits_from_the_keyboard_and_confirms_the_inquiry", async () => {
    const send = vi.fn().mockResolvedValue(undefined);
    render(<ContactForm send={send} />);
    fillRequiredFields();
    fireEvent.change(screen.getByLabelText("Company"), { target: { value: "Common Field" } });

    fireEvent.keyDown(screen.getByLabelText("Company"), { key: "Enter", code: "Enter" });

    expect(send).toHaveBeenCalledTimes(1);
    expect(send.mock.calls[0][0]).toMatchObject({ name: "Mina Lee", company: "Common Field" });
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("your inquiry is in"));
  });

  it("offers_a_prefilled_email_when_sending_fails", async () => {
    const send = vi.fn().mockRejectedValue(new Error("offline"));
    render(<ContactForm send={send} />);
    fillRequiredFields();
    fireEvent.submit(screen.getByRole("form", { name: "Project inquiry" }));

    const link = await screen.findByRole("link", { name: /email it to yojan@endlls.com/ });
    const href = link.getAttribute("href") ?? "";
    expect(href).toContain("mailto:yojan@endlls.com?");
    expect(href).toContain("Mina%20Lee");
    expect(href).toContain("new%20identity%20for%20a%20cultural%20program");
  });

  it("builds_an_encoded_inquiry_email", () => {
    const href = buildInquiryLink({
      name: "Mina Lee", email: "mina@example.com", company: "Common Field",
      projectType: "Brand and marketing", budget: "", message: "Hi",
    });
    expect(href).toContain("Common%20Field");
  });
});
