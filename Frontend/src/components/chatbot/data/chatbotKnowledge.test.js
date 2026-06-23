import assert from 'node:assert/strict';

import { buildKnowledgeBase, resolvePortfolioIntent } from './chatbotKnowledge.js';

const knowledgeBase = buildKnowledgeBase();

const slrGatEntry = knowledgeBase.projectEntries.find((entry) => entry.id === 'project-slr-gat');
assert.ok(slrGatEntry);
assert.match(slrGatEntry.reply, /GATv2|railway|train/i);

const projectIntent = resolvePortfolioIntent('tell me about the railway delay gnn research', knowledgeBase);
assert.equal(projectIntent.id, 'project-slr-gat');
assert.match(projectIntent.reply, /railway|train|GATv2/i);

const fallbackIntent = resolvePortfolioIntent('what is your favorite movie', knowledgeBase);
assert.equal(fallbackIntent.id, 'fallback');
assert.match(fallbackIntent.reply, /projects/i);
assert.match(fallbackIntent.reply, /skills|tech stack/i);

const contactIntent = resolvePortfolioIntent('how can i contact anne', knowledgeBase);
assert.equal(contactIntent.id, 'contact');
assert.match(contactIntent.reply, /anneperera008@gmail.com/i);

console.log('chatbotKnowledge tests passed');
