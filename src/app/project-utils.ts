import { createInitialSlides } from '../data'
import { loadLegacyProject, type PersistedProject, type ProjectSummary } from '../persistence'
import type { Slide, UploadAsset } from '../types'

export const DEFAULT_PROJECT_NAME = 'Summer Launch'

export type InitialProjectState = {
  projectName: string
  slides: Slide[]
  uploads: UploadAsset[]
}

export const loadInitialState = (): InitialProjectState => {
  const legacy = loadLegacyProject()
  if (legacy) return { projectName: DEFAULT_PROJECT_NAME, ...legacy }
  return { projectName: DEFAULT_PROJECT_NAME, slides: createInitialSlides(), uploads: [] }
}

export const sortProjectSummaries = (projects: ProjectSummary[]) =>
  [...projects].sort((a, b) => b.savedAt - a.savedAt)

export const upsertProjectSummary = (
  projects: ProjectSummary[],
  project: PersistedProject,
) => sortProjectSummaries([
  ...projects.filter((item) => item.id !== project.id),
  {
    id: project.id,
    projectName: project.projectName,
    createdAt: project.createdAt,
    savedAt: project.savedAt,
  },
])

export const getUniqueProjectName = (
  projects: ProjectSummary[],
  desiredName: string,
) => {
  const names = new Set(projects.map((project) => project.projectName.toLocaleLowerCase('en-US')))
  if (!names.has(desiredName.toLocaleLowerCase('en-US'))) return desiredName

  let suffix = 2
  while (names.has(`${desiredName} ${suffix}`.toLocaleLowerCase('en-US'))) suffix += 1
  return `${desiredName} ${suffix}`
}

const AUTO_PROJECT_NAME_PATTERN = /^new project(?: \d+)?$/

/**
 * True while the title is still one the app assigned itself — the seed project,
 * an untitled one, or a "New Project 3". Only those may be replaced silently.
 */
const isAutoProjectName = (name: string) => {
  const normalized = name.trim().toLocaleLowerCase('en-US')
  return normalized === ''
    || normalized === DEFAULT_PROJECT_NAME.toLocaleLowerCase('en-US')
    || AUTO_PROJECT_NAME_PATTERN.test(normalized)
}

/**
 * The title an AI generation run should leave behind: the app name the user
 * entered, deduplicated against the other projects. Returns `null` when the
 * title must stay untouched, so a name the user typed is never overwritten.
 */
export const resolveGeneratedProjectName = (
  projects: ProjectSummary[],
  currentProjectId: string,
  currentName: string,
  appName: string,
): string | null => {
  const desiredName = appName.trim()
  if (!desiredName || !isAutoProjectName(currentName)) return null
  const otherProjects = projects.filter((project) => project.id !== currentProjectId)
  return getUniqueProjectName(otherProjects, desiredName)
}

export const formatProjectTime = (timestamp: number) => new Date(timestamp).toLocaleString('en-US', {
  day: 'numeric',
  month: 'short',
  hour: 'numeric',
  minute: '2-digit',
})
