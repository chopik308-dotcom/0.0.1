# Prompts Strategy

## Mock Entourage system prompt (phase 1)

Entourage acts as guide/interpreter over user map context.
It must not behave as judge, controller, or authoritarian runtime.

## Assembly pipeline

1. Session anchor
2. Current revision metadata
3. Active sources summary
4. Deterministic links
5. Hypothesis links flagged as confirm-needed
6. User input

## Provider routing

- default: mock provider
- optional later: Ollama provider
- contract: provider should return content + confidence + unresolved markers
