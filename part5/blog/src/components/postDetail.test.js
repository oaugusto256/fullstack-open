import React from "react";

import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import Post from "./postDetail";

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