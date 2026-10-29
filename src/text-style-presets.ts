import { getContrastTextColor } from './utils'
import type { TextElement, TextStylePresetId } from './types'

export type TextStylePresetOption = {
  id: TextStylePresetId
  label: string
}

/**
 * One-click text style presets for the text toolbar (closes issue #10,
 * "Add one-click text style presets to the text toolbar"). Each preset
 * returns a full patch of the properties it owns, so applying one is a
 * single `onUpdate` call and therefore a single undo step. Presets reuse the
 * text element's current color for any background or stroke they introduce,
 * so they stay consistent with whatever palette the user already picked
 * instead of injecting a fixed brand color.
 */
export const textStylePresetOptions: TextStylePresetOption[] = [
  { id: 'plain', label: 'Plain' },
  { id: 'pill', label: 'Pill' },
  { id: 'card', label: 'Card' },
  { id: 'highlight', label: 'Highlight' },
  { id: 'outline', label: 'Outline' },
]

type TextStylePatch = Pick<
  TextElement,
  'color' | 'backgroundColor' | 'backgroundOpacity' | 'padding' | 'borderRadius' | 'strokeColor' | 'strokeWidth' | 'shadow'
>

export const getTextStylePresetPatch = (
  element: TextElement,
  preset: TextStylePresetId,
): Partial<TextStylePatch> => {
  switch (preset) {
    case 'plain':
      return { backgroundOpacity: 0, padding: 0, borderRadius: 0, strokeWidth: 0, shadow: 0 }
    case 'pill':
      return {
        backgroundColor: element.color,
        backgroundOpacity: 1,
        padding: 14,
        borderRadius: 40,
        strokeWidth: 0,
        shadow: 0,
        color: getContrastTextColor(element.color),
      }
    case 'card':
      return {
        backgroundColor: element.color,
        backgroundOpacity: 0.14,
        padding: 16,
        borderRadius: 16,
        strokeWidth: 0,
        shadow: 0,
      }
    case 'highlight':
      return {
        backgroundColor: element.color,
        backgroundOpacity: 1,
        padding: 3,
        borderRadius: 3,
        strokeWidth: 0,
        shadow: 0,
        color: getContrastTextColor(element.color),
      }
    case 'outline':
      return {
        backgroundOpacity: 0,
        padding: 0,
        borderRadius: 0,
        shadow: 0,
        strokeWidth: 1.5,
        strokeColor: getContrastTextColor(element.color),
      }
    default:
      return {}
  }
}
