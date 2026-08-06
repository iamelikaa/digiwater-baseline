import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { districts } from '../data/mockData';

export interface ActiveNav {
  activeItemId: string;
  activeTitle: string;
}

/**
 * Derives which nav item is "active" and what the current page title should
 * be, purely from the URL (pathname + route params). Used by both Sidebar
 * (to highlight the right item) and DashboardLayout (to set the TopBar
 * title), so the two stay in sync automatically instead of depending on
 * shared component state.
 */
export function useActiveNav(): ActiveNav {
  const location = useLocation();
  const { cityId, districtId } = useParams<{ cityId?: string; districtId?: string }>();

  return useMemo(() => {
    if (location.pathname === '/report-leak') {
      return { activeItemId: 'report-leak', activeTitle: 'Report Leak' };
    }
    if (location.pathname === '/leak-history') {
      return { activeItemId: 'leak-history', activeTitle: 'Leak History' };
    }
    if (location.pathname === '/settings') {
      return { activeItemId: 'settings', activeTitle: 'User Profile' };
    }
    if (districtId) {
      const district = districts.find((d) => d.id === districtId);
      if (district) {
        return { activeItemId: districtId, activeTitle: district.name };
      }
    }
    if (cityId) {
      const city = districts.find((d) => d.id === cityId);
      if (city) {
        return { activeItemId: cityId, activeTitle: city.name };
      }
    }
    return { activeItemId: 'overview', activeTitle: 'Overview' };
  }, [cityId, districtId, location.pathname]);
}
