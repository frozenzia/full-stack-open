import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import AddBlogForm from "./AddBlogForm";

describe("AddBlogForm tests...", () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    test("form calls callback with correct info when creating blog", async () => {
        const { container } = render(<AddBlogForm onSubmit={onSubmit} />);
        const enteredTitle = "Green Eggs and Ham";
        const enteredAuthor = "Dr. Seuss";
        const enteredUrl = "sam.i.am.com";

        const titleInput = screen.getByPlaceholderText("enter blog title here");
        const authorInput = screen.getByPlaceholderText(
            "enter blog author here"
        );
        const urlInput = screen.getByPlaceholderText("enter blog url here");
        const button = container.querySelector("button");

        await user.type(titleInput, enteredTitle);
        await user.type(authorInput, enteredAuthor);
        await user.type(urlInput, enteredUrl);
        await user.click(button);

        expect(onSubmit.mock.calls).toHaveLength(1);
        expect(onSubmit.mock.calls[0][0].title).toBe(enteredTitle);
        expect(onSubmit.mock.calls[0][0].author).toBe(enteredAuthor);
        expect(onSubmit.mock.calls[0][0].url).toBe(enteredUrl);
    });
});
