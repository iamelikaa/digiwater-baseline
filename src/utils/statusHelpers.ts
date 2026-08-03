import { districts } from '../data/mockData';
import type { District } from '../data/mockData';

export type StatusValue = 'normal' | 'anomaly';

/**
 * Computes the effective displayed status for a given district or municipality.
 * For any parent entity (an entity that has child districts nested under it where child.parentId === entity.id),
 * its displayed status is the worst status among its own children ('anomaly' outranks 'normal').
 * Entities with no children keep using their own `status` field directly.
 */
export function getEffectiveStatus(
  entity: District,
  allDistricts: District[] = districts
): StatusValue {
  const children = allDistricts.filter((d) => d.parentId === entity.id);
  if (children.length > 0) {
    const hasAnomaly = children.some((child) => child.status === 'anomaly');
    return hasAnomaly ? 'anomaly' : 'normal';
  }
  return entity.status;
}

/**
 * Checks if a given entity is a parent municipality (i.e. has child districts nested under it).
 */
export function isParentMunicipality(
  entity: District,
  allDistricts: District[] = districts
): boolean {
  return allDistricts.some((d) => d.parentId === entity.id);
}
