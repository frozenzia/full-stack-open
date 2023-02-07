import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import Blog from "./Blog";

describe("joku otsikko tälle testisetille", () => {
  let container;
  const onLikePress = jest.fn();
  const onDeletePress = jest.fn();

  beforeEach(() => {
    const blog = {
      id: 12345,
      title: "Test blog title",
      author: "MC Escher",
      url: "earl.com.tv",
      likes: 42,
      user: {
        name: "Elliot Brown",
        username: "evbrown",
      },
    };

    container = render(
      <Blog
        blog={blog}
        username={blog.user.username}
        onLikePress={onLikePress}
        onDeletePress={onDeletePress}
      />
    ).container;
  });

  test("renders content", () => {
    const element = screen.getByText("Test blog title", { exact: false });
    expect(element).toBeDefined();
    const element2 = screen.getByText("MC Escher", { exact: false });
    expect(element2).toBeDefined();

    const likeButtonDiv = screen.getByText("like").parentElement.parentElement;
    expect(likeButtonDiv).toHaveClass("hideMe");
  });

  test('clicking the "view" button reveals url, likes + button, and user\'s name', async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const element = screen.getByText("earl.com.tv");
    expect(element).toBeDefined();
    const element2 = container.querySelector(".likesPlusLikeButton");
    expect(element2).toBeDefined();
    const element3 = container.querySelector(".usersName");
    expect(element3).toBeDefined();
  });

  test("pressing like button twice, event handler is called twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const likeButton = container.querySelector(".likeButton");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(onLikePress.mock.calls).toHaveLength(2);
  });
});
