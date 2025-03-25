import { cleanup, render } from "@testing-library/react";
import { test, expect, afterEach, vi } from "vitest";
import createFecthMock from "vitest-fetch-mock";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy";

const query = new QueryClient();

const fetchMock = createFecthMock(vi);
fetchMock.enableMocks();

afterEach(cleanup);

test("can submit contact form", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ success: 'ok' }));

  const screen = render(
    <QueryClientProvider client={query}>
      <Route.options.component />
    </QueryClientProvider>
  );

  const nameInput = screen.getByPlaceholderText('Name');
  const emailInput = screen.getByPlaceholderText('Email');
  const messageInput = screen.getByPlaceholderText('Your message');

  const testData = {
    name: 'Test User',
    email: 'diego@fakeemail.com',
    message: 'Test message',
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  messageInput.value = testData.message;

  const btn = screen.getByRole('button', { name: 'Submit' });
  btn.click();

  const heading = await screen.findByRole('heading', { level: 3 });
  expect(heading.textContent).toBe('Submitted!');

  const req = fetchMock.requests();
  expect(req.length).toBe(1);
  expect(req[0].url).toBe('/api/contact');
  expect(fetchMock).toHaveBeenCalledWith('/api/contact', {
    method: 'POST',
    body: JSON.stringify(testData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
});
