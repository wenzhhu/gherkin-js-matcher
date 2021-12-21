import { featureMatchesTags } from '../index';
import * as fs from 'fs-extra';

test('My Gretter', () => {
  const featureFile = './src/__tests__/1.full.feature';
  console.log(process.cwd());
  expect(featureMatchesTags(featureFile, 
        fs.readFileSync(featureFile, 'utf-8'), "@soTag1")).toBe(true);
});