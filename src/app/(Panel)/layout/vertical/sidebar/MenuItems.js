import { uniqueId } from 'lodash';

import { IconLayoutDashboard, IconScan, IconUsers, IconZoomScan } from '@tabler/icons-react';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/u/dashboard',
    prefix: '/u',
  },
  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/a/dashboard',
    prefix: '/a',
  },

  {
    id: uniqueId(),
    title: 'Scan Tools',
    icon: IconScan,
    href: '/u/scan-tools',
    prefix: '/u',
  },
  {
    id: uniqueId(),
    title: 'Scan Tools ',
    icon: IconScan,
    href: '/a/scan-tools',
    prefix: '/a',
  },
  {
    id: uniqueId(),
    title: 'Users',
    icon: IconUsers,
    href: '/a/users',
    prefix: '/a',
  },

  {
    id: uniqueId(),
    title: 'Past Scan',
    icon: IconZoomScan,
    href: '/u/past-scans',
    prefix: '/u',
  },
];

export default Menuitems;
