import { Greeter } from '../index';
test('My Gretter', () => {
  expect(Greeter('Carl')).toBe('Hello Carl');
});