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
    expect(fetchMock.mock.calls[0][0]).toEqual("/api/sendgrid");
    expect(screen.getByLabelText("name")).toHaveValue("");
    expect(screen.getByLabelText("email")).toHaveValue("");
    expect(screen.getByLabelText("message")).toHaveValue("");
  });
});
