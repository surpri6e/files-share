import { formatBytes } from 'bytes-transform';

export const maximumBytes = formatBytes(10, { from: 'MB', to: 'MB' });
