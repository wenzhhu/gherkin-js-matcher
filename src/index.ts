import * as messages from '@cucumber/messages'
import * as fs from 'fs-extra';
import {GlobSync} from 'glob';
import * as _ from 'lodash';
import Parser from 'gherkin/dist/src/Parser';
import  tag_expression_parser  from 'cucumber-tag-expressions';
import AstBuilder from 'gherkin/dist/src/AstBuilder';

/**
 * Check if a feature contents matches the given tagExpression
 * @param contents The content of the feature file
 * @param tagExpression The tags that the feature file to match
 * @returns true if the feature contents matches the tagExpression, otherwise false
 */
export const featureContentsMatchesTags = (contents:string, tagExpression: string) => {
    const gherkinParser = new Parser(new AstBuilder(messages.IdGenerator.incrementing()));
    const gherkinDocument : messages.GherkinDocument = gherkinParser.parse(contents);

    const featureLevelTags = gherkinDocument.feature!.tags.map(t => t.name);
    for (const child of gherkinDocument.feature!.children) {
        if (child.scenario) {
            const scenarioLevelTags = child.scenario.tags.map((t) => t.name);

            const flattened = (array:any) => [].concat(...array);
            const exampleLevelTags = (child.scenario.examples) ?
                flattened(child.scenario.examples.map(example => example.tags.map(tag => tag.name))) :
                [];

            const combinedTags = _.union(featureLevelTags, scenarioLevelTags, exampleLevelTags);


            const tagExpressionNode = tag_expression_parser(tagExpression || '');
            if (tagExpressionNode.evaluate(combinedTags)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Check if a feature file matches the given tagExpression
 * @param path The path of the feature file
 * @param tagExpression The tags that the feature file to match
 * @returns true if the feature file matches the tagExpression, otherwise false
 */
export const featureFileMatchesTags = (path:string, tagExpression: string) => {
    return featureContentsMatchesTags(fs.readFileSync(path, 'utf-8'), tagExpression);
}

/**
 * Filter spec (cucmber feature) files in a config by matching tags defined in the given config.
 * So in the text execution, those excluded spec files won't be evalauted again. This will
 * save 10 - 15 test execution seconds for each excldued spec file. Also the test execution log
 * will be much cleaner.
 * @param config The config file whose spec files are to be filtered
 * @returns A new config file which contains only matched spec (cucmber feature) files
 */
// var filter_by_tag = function (config) {
//     const tagExpression = config.cucumberOpts.tagExpression;
//     const specs = config.specs;
//     const newSpecs = [];

//     specs.forEach(function (item) {
//         const files = glob.sync(item);
//         files.forEach(function (featurePath) {
//             const source = fs.readFileSync(featurePath, 'utf8');
//             if (featureMatchesTags(featurePath, source, tagExpression)) {
//                 newSpecs.push(featurePath);
//             }
//         });
//     });

//     config.specs = newSpecs;
//     return config;
// };


/**
 * return case number in a feature file matching given tags
 * @param path The path of a feature file
 * @param source The content of the feature file
 * @param tagExpression The tags that the feature file to match
 * @returns number of cases matching the tags
 */
// const countCaseNumberForFeatureFile = function (path, source, tagExpression) {
//     const allCasesInTheFeatureFile = getCasesFromFeatureFile(path, source);

//     const tagExpressionParser = new TagExpressionParser();
//     const tagExpressionNode = tagExpressionParser.parse(tagExpression);
//     const ifTagsMatchGivenTagExrepssion = function(tags) {
//         return tagExpressionNode.evaluate(tags)
//     }

//     return allCasesInTheFeatureFile.filter(c => ifTagsMatchGivenTagExrepssion(c.tags)).length;
// }

/**
 * get all cases in a feature file
 * @param path The path of a feature file
 * @param source The content of the feature file
 * @returns an array containing all cases in the feature file
 *              case is an object in the following format
 * {
 *  "name" : <case name>,
 *  "tags" : <all tags attached to the case>
 * }
 */
// const getCasesFromFeatureFile = function (path, source) {
//     const gherkinParser = new Gherkin.Parser();

//     let gherkinDocument;
//     try {
//         gherkinDocument = gherkinParser.parse(source);
//     } catch (error) {
//         error.message += '\npath: ' + path;
//         throw error;
//     }

//     const cases = [];

//     const featureLevelTags = gherkinDocument.feature.tags.map(t => t.name);
//     for (const child of gherkinDocument.feature.children) {
//         if (child.type === 'Scenario') {
//             const scenarioLevelTags = child.tags.map(t => t.name);
//             const combinedTags = _.union(scenarioLevelTags, featureLevelTags);

//             cases.push({
//                 "name" : child.name,
//                 "tags" : combinedTags
//             });
//         } else if (child.type === 'ScenarioOutline') {
//             const scenarioLevelTags = child.tags.map((t) => t.name);//             for (const example of child.examples) {
//                 const exampleLevelTags = example.tags.map(t => t.name);
//                 const combinedTags = _.union(scenarioLevelTags, featureLevelTags, exampleLevelTags);
//                 example.tableBody.forEach( () => cases.push({
//                     "name" : child.name,
//                     "tags" : combinedTags
//                 }));
//             }
//         }
//     }

//     return cases;
// }

