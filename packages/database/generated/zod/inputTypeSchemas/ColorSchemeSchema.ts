import { z } from 'zod';

export const ColorSchemeSchema = z.enum(['LIGHT', 'DARK', 'TBA']);

export type ColorSchemeType = `${z.infer<typeof ColorSchemeSchema>}`;

export default ColorSchemeSchema;
