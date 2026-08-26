import { describe, expect, it } from 'vitest'
import { CODING_ASSISTANT_PROMPT } from './CopyCodingPrompt'

describe('coding assistant prompt', () => {
  it('asks for a paste-ready plain-prose app description', () => {
    expect(CODING_ASSISTANT_PROMPT).toContain('plain-prose paragraph')
    expect(CODING_ASSISTANT_PROMPT).toContain('paste straight into the generator')
  })

  it('covers audience, key features, and the visual theme', () => {
    expect(CODING_ASSISTANT_PROMPT).toContain('who it is for')
    expect(CODING_ASSISTANT_PROMPT).toContain('most important features')
    expect(CODING_ASSISTANT_PROMPT).toContain('the theme the screenshots should match')
  })

  it('asks for the hero benefit and the differentiator the story arc builds on', () => {
    expect(CODING_ASSISTANT_PROMPT).toContain('single strongest benefit')
    expect(CODING_ASSISTANT_PROMPT).toContain('headline the first screenshot')
    expect(CODING_ASSISTANT_PROMPT).toContain('sets it apart from similar apps')
    expect(CODING_ASSISTANT_PROMPT).toContain('in order of importance')
    expect(CODING_ASSISTANT_PROMPT).toContain('pains they remove')
  })

  it('forbids inventing features and code-level detail', () => {
    expect(CODING_ASSISTANT_PROMPT).toContain('do not invent features, claims, or ratings')
    expect(CODING_ASSISTANT_PROMPT).toContain('not the code, tech stack, or file layout')
  })
})
