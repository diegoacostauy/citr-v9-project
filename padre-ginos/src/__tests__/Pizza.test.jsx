import { cleanup, render } from "@testing-library/react";
import { test, expect, afterEach } from "vitest";
import { Pizza } from "../Pizza";

afterEach(cleanup);

test("Pizza alt test render on images", async () => {
  expect.assertions(2);

  const name = 'My Favorite Pizza';
  const src = 'https://picsum.photos/200';

  const screen = render(
    <Pizza name={name} img={src} description="Super cool pizza" />
  );

  const img = screen.getByRole('img');
  expect(img.src).toBe(src);
  expect(img.alt).toBe(name);
  // cleanup(); // This is not necessary because of the afterEach
});

test("Pizza to have a default image if none is provided", async () => {
  expect.assertions(1);

  const screen = render(
    <Pizza name="My Favorite Pizza" description="Super cool pizza" />
  );

  const image = screen.getByRole('img');
  expect(image.src).not.toBe('');

  // cleanup(); // This is not necessary because of the afterEach
});
