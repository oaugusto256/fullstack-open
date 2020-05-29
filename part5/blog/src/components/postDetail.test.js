import React from "react";

import "@testing-library/jest-dom/extend-expect";

import { render, fireEvent } from "@testing-library/react";

import Post from "./postDetail";
import NewPostForm from "./newPostForm";

test("renders title and author", () => {
  const post = {
    title: "Test test",
    author: "Otavio Augusto",
    url: "Bla bla bla",
    likes: 10,
    user: null
  };

  const component = render(
    <Post post={post} />,
  );

  const h2 = component.container.querySelector(".title");
  expect(h2).toHaveTextContent("Test test");

  const p = component.container.querySelector(".author");
  expect(p).toHaveTextContent("Otavio Augusto");
});

test("should show post likes after show click", () => {
  const post = {
    title: "Test test",
    author: "Otavio Augusto",
    url: "Bla bla bla",
    likes: 10,
    user: null
  };

  const component = render(
    <Post post={post} />,
  );

  const button = component.getByText("Show details");
  fireEvent.click(button);

  const div = component.container.querySelector(".post-likes");

  expect(div).toHaveTextContent("Likes: 10");
});

test("should show button Close details lable", () => {
  const post = {
    title: "Test test",
    author: "Otavio Augusto",
    url: "Bla bla bla",
    likes: 10,
    user: null
  };

  const component = render(
    <Post post={post} />,
  );

  const button = component.getByText("Show details");
  fireEvent.click(button);

  expect(button).toHaveTextContent("Close details");
});


test("<NewPostForm /> calls onSubmit", () => {
  const addBlogPost = jest.fn();

  const component = render(
    <NewPostForm addBlogPost={addBlogPost} />
  );

  const inputTitle = component.container.querySelector(".post-title");
  const inputAuthor = component.container.querySelector(".post-author");
  const inputUrl = component.container.querySelector(".post-url");
  const inputLikes = component.container.querySelector(".post-likes");

  const form = component.container.querySelector("form");

  fireEvent.change(inputTitle, {
    target: { value: "Bla bla bla" }
  });

  fireEvent.change(inputAuthor, {
    target: { value: "Ui ui ui" }
  });

  fireEvent.change(inputUrl, {
    target: { value: "http://www.google.com" }
  });

  fireEvent.change(inputLikes, {
    target: { value: 10 }
  });

  fireEvent.submit(form);

  expect(addBlogPost.mock.calls).toHaveLength(1);
});