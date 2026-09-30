export const EXPORT_ARTBOARD_WIDTH = 330

export const EXPORT_FORMATS = [
  {
    id: 'iphone-6.9-1320',
    label: '6.9-inch display (1320 × 2868)',
    shortLabel: '6.9″ Pro Max',
    width: 1320,
    height: 2868,
    filename: '6.9-inch-1320x2868',
  },
  {
    id: 'iphone-6.5-1284',
    label: '6.5-inch display (1284 × 2778)',
    shortLabel: '6.5″ 1284',
    width: 1284,
    height: 2778,
    filename: '6.5-inch-1284x2778',
  },
  {
    id: 'iphone-6.9',
    label: '6.9-inch display',
    shortLabel: '6.9″',
    width: 1290,
    height: 2796,
    filename: '6.9-inch',
  },
  {
    id: 'iphone-6.5',
    label: '6.5-inch display',
    shortLabel: '6.5″',
    width: 1242,
    height: 2688,
    filename: '6.5-inch',
  },
] as const

export type ExportFormat = (typeof EXPORT_FORMATS)[number]

export type ExportTarget = ExportFormat | 'all'
