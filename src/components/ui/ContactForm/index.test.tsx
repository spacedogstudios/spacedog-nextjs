import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ContactForm from "@/components/ui/ContactForm/index";

describe("ContactSection", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should display required error when value is invalid", async () => {
    render(<ContactForm />);

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(3);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("should display matching error when email is invalid", async () => {
    render(<ContactForm />);

    fireEvent.input(screen.getByLabelText("name"), {
      target: {
        value: "name",
      },
    });

    fireEvent.input(screen.getByLabelText("email"), {
      target: {
        value: "email",
      },
    });

    fireEvent.input(screen.getByLabelText("message"), {
      target: {
        value: "message",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("name")).toHaveValue("name");
    expect(screen.getByLabelText("email")).toHaveValue("email");
    expect(screen.getByLabelText("message")).toHaveValue("message");
  });

  it("should display min length error when name is invalid", async () => {
    render(<ContactForm />);

    fireEvent.input(screen.getByLabelText("name"), {
      target: {
        value: "n",
      },
    });

    fireEvent.input(screen.getByLabelText("email"), {
      target: {
        value: "test@mail.com",
      },
    });

    fireEvent.input(screen.getByLabelText("message"), {
      target: {
        value: "message",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("name")).toHaveValue("n");
    expect(screen.getByLabelText("email")).toHaveValue("test@mail.com");
    expect(screen.getByLabelText("message")).toHaveValue("message");
  });

  it("should display min length error when message is invalid", async () => {
    render(<ContactForm />);

    fireEvent.input(screen.getByLabelText("name"), {
      target: {
        value: "name",
      },
    });

    fireEvent.input(screen.getByLabelText("email"), {
      target: {
        value: "test@mail.com",
      },
    });

    fireEvent.input(screen.getByLabelText("message"), {
      target: {
        value: "m",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    expect(await screen.findAllByRole("alert")).toHaveLength(1);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("name")).toHaveValue("name");
    expect(screen.getByLabelText("email")).toHaveValue("test@mail.com");
    expect(screen.getByLabelText("message")).toHaveValue("m");
  });

  it("should not display error when value is valid", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
    render(<ContactForm />);

    fireEvent.input(screen.getByLabelText("name"), {
      target: {
        value: "name",
      },
    });

    fireEvent.input(screen.getByLabelText("email"), {
      target: {
        value: "test@mail.com",
      },
    });

    fireEvent.input(screen.getByLabelText("message"), {
      target: {
        value: "message",
      },
    });

    fireEvent.submit(screen.getByRole("button"));

    await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
    expect(fetchMock.mock.calls.length).toEqual(1);
    expect(fetchMock.mock.calls[0][0]).toEqual("/api/contact");
    expect(screen.getByLabelText("name")).toHaveValue("");
    expect(screen.getByLabelText("email")).toHaveValue("");
    expect(screen.getByLabelText("message")).toHaveValue("");
    expect(await screen.findByRole("status")).toHaveTextContent("Message sent");
  });

  it("should show an error notification and keep values when sending fails", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        errors: { root: { message: "Sorry, your message couldn't be sent" } },
      }),
      { status: 502 },
    );
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
    render(<ContactForm />);

    fireEvent.input(screen.getByLabelText("name"), {
      target: {
        value: "name",
      },
    });

    fireEvent.input(screen.getByLabelText("email"), {
      target: {
        value: "test@mail.com",
      },
    });

    fireEvent.input(screen.getByLabelText("message"), {
      target: {
        value: "message",
      },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Sorry, your message couldn't be sent",
    );
    expect(screen.getByLabelText("message")).toHaveValue("message");

    fireEvent.click(screen.getByRole("button", { name: "Try again" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Message sent");
    expect(fetchMock.mock.calls.length).toEqual(2);
  });
});
