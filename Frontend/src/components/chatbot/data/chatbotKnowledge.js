import { profile } from '../../../data/portfolio.js';
import { QUICK_COMMANDS } from './ChatbotConfig.js';

function normalizeText(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9\s/+.-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function scoreKeywords(normalizedInput, keywords = []) {
  return keywords.reduce((score, keyword) => {
    const normalizedKeyword = normalizeText(keyword);
    if (!normalizedKeyword) return score;
    return normalizedInput.includes(normalizedKeyword) ? score + 1 : score;
  }, 0);
}


export function buildKnowledgeBase() {

  const projectFollowUps = ['project-slr-gat', 'project-super-resolution', 'project-credit-ai', 'project-citation-verifier', 'project-local-rag'];

  const projectEntries = [
    {
      id: 'project-slr-gat',
      label: 'SLR GAT (GNN)',
      keywords: ['slr', 'gat', 'gnn', 'railway', 'train', 'delay', 'monsoon', 'graph', 'research'],
      reply: "SLR GAT is Anne's ongoing research project — a GATv2 framework with climate-conditioned edge weights to model and explain how monsoon weather reshapes train-delay propagation across Sri Lanka's railway network.",
      followUps: projectFollowUps.filter(id => id !== 'project-slr-gat').concat(['stack', 'contact']),
      reaction: 'project-mode',
    },
    {
      id: 'project-super-resolution',
      label: 'Super-Resolution',
      keywords: ['super resolution', 'esrgan', 'tensorrt', 'onnx', 'inference', 'image', 'upscale'],
      reply: "The Super-Resolution project is an image upscaling pipeline using Real-ESRGAN with a PyTorch → ONNX → TensorRT (FP16) optimization chain that cuts inference latency 2× while preserving output quality.",
      followUps: projectFollowUps.filter(id => id !== 'project-super-resolution').concat(['stack', 'contact']),
      reaction: 'project-mode',
    },
    {
      id: 'project-credit-ai',
      label: 'CreditAI',
      keywords: ['credit', 'creditai', 'risk', 'xgboost', 'fraud', 'lending', 'fintech', 'ml'],
      reply: "CreditAI is an enterprise risk intelligence platform using ensemble ML models (XGBoost, Random Forest, Gradient Boosting) with fraud detection and NLP sentiment analysis for real-time lending decisions.",
      followUps: projectFollowUps.filter(id => id !== 'project-credit-ai').concat(['stack', 'contact']),
      reaction: 'project-mode',
    },
    {
      id: 'project-citation-verifier',
      label: 'Citation Verifier',
      keywords: ['citation', 'claim', 'verifier', 'chrome', 'extension', 'fact check', 'claude api'],
      reply: "The Citation & Claim Verifier is a Chrome extension that fact-checks highlighted claims via the Claude API with live web search, returning source-backed verdicts (Supported / Disputed / Unverifiable).",
      followUps: projectFollowUps.filter(id => id !== 'project-citation-verifier').concat(['stack', 'contact']),
      reaction: 'project-mode',
    },
    {
      id: 'project-local-rag',
      label: 'Local RAG',
      keywords: ['rag', 'local', 'retrieval', 'augmented', 'generation', 'chatbot', 'faiss', 'ollama'],
      reply: "Local RAG is a fully local Retrieval-Augmented Generation chatbot that answers questions exclusively from user-uploaded PDF, TXT, and Markdown documents using FAISS semantic search and Sentence Transformers.",
      followUps: projectFollowUps.filter(id => id !== 'project-local-rag').concat(['stack', 'contact']),
      reaction: 'project-mode',
    }
  ];

  const entries = [
    {
      id: 'intro',
      label: 'Tell me about Anne',
      keywords: ['who is anne', 'about anne', 'about', 'background', 'summary', profile.name],
      reply: "Anne Perera is a Computer Science undergraduate at the University of Kelaniya, Sri Lanka. She focuses on AI/ML research, full-stack development, and building production-grade systems spanning web, mobile, and data pipelines.",
      followUps: ['projects', 'stack', 'experience', 'contact'],
      reaction: 'wave',
    },
    {
      id: 'projects',
      label: 'Projects',
      keywords: ['projects', 'project', 'portfolio', 'build', 'work', 'demo'],
      reply: "Anne has several high-impact projects. Highlights include SLR GAT (ongoing GNN research), a Super-Resolution inference optimization pipeline, CreditAI, a Citation Verifier Chrome Extension, and a Local RAG chatbot. Which one would you like to hear more about?",
      followUps: ['project-slr-gat', 'project-super-resolution', 'project-credit-ai', 'project-citation-verifier', 'project-local-rag'],
      reaction: 'project-mode',
    },
    {
      id: 'stack',
      label: 'Tech Stack',
      keywords: ['stack', 'skills', 'tech', 'tools', 'frameworks', 'languages', 'backend', 'frontend', 'cloud'],
      reply: "Anne's tech stack spans Java, Python, TypeScript, and JavaScript for languages. For backend she uses Spring Boot, FastAPI, and Node.js. She works with PyTorch and GNNs for AI/ML, and deploys with AWS, Docker, and Vercel.",
      followUps: ['projects', 'experience', 'contact'],
      reaction: 'cpu',
    },
    {
      id: 'experience',
      label: 'Experience',
      keywords: ['experience', 'internship', 'intern', 'work', 'career', 'roles', 'aws', 'rotaract'],
      reply: "Anne is active in the tech community — she served as Head of Events and Logistics at AWS Student Community Day Sri Lanka 2026, is a member of the AWS Student Builder Group, and is an active Rotaract Club member at the University of Kelaniya.",
      followUps: ['projects', 'education', 'contact'],
      reaction: 'document',
    },
    {
      id: 'education',
      label: 'Education',
      keywords: ['education', 'college', 'degree', 'university', 'kelaniya', 'cgpa', 'study', 'colombo'],
      reply: "Anne is pursuing a BSc (Hons) in Computer Science at the University of Kelaniya, Sri Lanka (2023 – Present). She also completed a Certificate Course on Data Science with Python at the University of Colombo School of Computing.",
      followUps: ['projects', 'experience', 'contact'],
      reaction: 'document',
    },
    {
      id: 'contact',
      label: 'Contact',
      keywords: ['contact', 'email', 'phone', 'reach', 'linkedin', 'github', 'connect'],
      reply: "You can reach Anne via email at anneperera008@gmail.com. Connect with her on LinkedIn at linkedin.com/in/anne-perera-b62171359, or check out her projects on GitHub at github.com/IdushaniAnnePerera.",
      followUps: ['projects', 'stack', 'experience'],
      reaction: 'mail',
    },
    {
      id: 'clear',
      label: 'Reset chat',
      keywords: ['clear', 'reset', 'restart', '/clear'],
      reply: 'Clearing the current conversation and returning to the default portfolio prompts.',
      action: 'CLEAR_CHAT',
      followUps: ['intro', 'projects', 'stack'],
      reaction: 'shield',
    },
  ];

  const fallback = {
    id: 'fallback',
    label: 'Fallback',
    keywords: [],
    reply:
      "I only answer from Anne's portfolio content. Try asking about projects, tech stack, experience, education, or contact details.",
    followUps: ['intro', 'projects', 'stack', 'contact'],
    reaction: 'alert',
  };

  const allEntries = [...entries, ...projectEntries, fallback];

  return {
    defaultPromptIds: ['intro', 'projects', 'stack', 'experience', 'contact'],
    entries: allEntries,
    entriesById: Object.fromEntries(allEntries.map((entry) => [entry.id, entry])),
    quickCommands: QUICK_COMMANDS,
    projectEntries,
    fallback,
  };
}

export function resolvePortfolioIntent(rawText = '', knowledgeBase = buildKnowledgeBase()) {
  const normalizedInput = normalizeText(rawText);

  if (!normalizedInput) {
    return knowledgeBase.fallback;
  }

  const commandMatch = knowledgeBase.quickCommands.find((command) =>
    normalizedInput.includes(normalizeText(command.command))
  );
  if (commandMatch) {
    return knowledgeBase.entriesById[commandMatch.id] ?? knowledgeBase.fallback;
  }

  // Check for exact ID match (useful for button clicks)
  if (knowledgeBase.entriesById[normalizedInput.replace(/\s+/g, '-')]) {
    return knowledgeBase.entriesById[normalizedInput.replace(/\s+/g, '-')];
  }

  // Also check for ID match without the 'project-' prefix if applicable
  if (knowledgeBase.entriesById[normalizedInput]) {
    return knowledgeBase.entriesById[normalizedInput];
  }

  const bestMatch = knowledgeBase.entries
    .filter((entry) => entry.id !== 'fallback')
    .map((entry) => ({
      entry,
      score: scoreKeywords(normalizedInput, entry.keywords),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      const leftIsProject = left.entry.id.startsWith('project-');
      const rightIsProject = right.entry.id.startsWith('project-');

      if (leftIsProject === rightIsProject) {
        return 0;
      }

      return rightIsProject ? 1 : -1;
    })[0];

  return bestMatch?.score > 0 ? bestMatch.entry : knowledgeBase.fallback;
}
