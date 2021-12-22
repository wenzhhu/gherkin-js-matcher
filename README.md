# gherkin-js-util
NPM package for utilities processing feature files ([cucumber](https://cucumber.io/) test cases)
* check if a feature file matches a tag string


## Installation

```npm i gherkin-js-util```

## Usage

```
const { featureFileMatchesTags } = require('gherkin-js-matcher');

featureFileMatchesTags("./some/feature.file", "@tag1 and @tag2");
```
