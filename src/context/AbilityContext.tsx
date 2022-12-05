/* Import context */
import { createContext } from 'react';

import { createContextualCan } from '@casl/react';

export interface RawRule {
  action: string | string[];
  subject?: string | string[];
  /** an array of fields to which user has (or not) access */
  fields?: string[];
  /** an object of conditions which restricts the rule scope */
  conditions?: any;
  /** indicates whether rule allows or forbids something */
  inverted?: boolean;
  /** message which explains why rule is forbidden */
  reason?: string;
}

export const AbilityContext = createContext(null);

// @ts-ignore
export const Can = createContextualCan(AbilityContext.Consumer);
