import { featureFileMatchesTags } from '../index';

test('full feature file', () => {
  const featureFile = './src/__tests__/1.full.feature';
  expect(featureFileMatchesTags(featureFile, "@soTag1")).toBe(true);
  expect(featureFileMatchesTags(featureFile, "@noTag1")).toBe(false);
});