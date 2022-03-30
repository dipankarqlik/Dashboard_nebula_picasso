import { embed } from '@nebula.js/stardust';

import barchart from '@nebula.js/sn-bar-chart';

import radarChartSn from './radar-chart-sn';

import steamChart from './steam';

import customScat from './custom_scat';

import linechart from '@nebula.js/sn-line-chart';

const n = embed.createConfiguration({
  context: {
    theme: 'light',
    language: 'en-US',
  },
  types: [
    {
      name: 'barchart',
      load: () => Promise.resolve(barchart),
    },
    {
      name: 'radar-chart',
      load: () => Promise.resolve(radarChartSn),
    },
    {
      name: 'steam-chart',
      load: () => Promise.resolve(steamChart),
    },
    {
      name: 'custom-scat',
      load: () => Promise.resolve(customScat),
    },
    {
      name: 'linechart',
      load: () => Promise.resolve(linechart),
    },
  ],
});

export default n;


