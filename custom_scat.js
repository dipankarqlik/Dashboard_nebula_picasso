const stardust = require('@nebula.js/stardust');
import picassojs from 'picasso.js';
import picassoQ from 'picasso-plugin-q';

export default function supernova() {
  // create picasso instance
  const picasso = picassojs();
  
  // register picassoQ plugin
  picasso.use(picassoQ);

  

//Define properties & data handled by QIX:
  return {
    qae: {
      properties: {
        qHyperCubeDef: {
          qDimensions: [],
          qMeasures: [],
          qInitialDataFetch: [{ qWidth: 100, qHeight: 100 }],
          qSuppressZero: true,
          qSuppressMissing: true,
        },
        showTitles: true,
        title: '',
        subtitle: '',
        footnote: '',
      },
      data: {
        targets: [
          {
            path: '/qHyperCubeDef',
            dimensions: {
              min: 1,
              max: 2,
            },
            measures: {
              min: 2,
              max: 3,
            },
          },
        ],
      },
    },
    
    //Rendering the visual part:
    component() {
      const element = stardust.useElement();
      const layout = stardust.useStaleLayout();
      const rect = stardust.useRect();

      const [instance, setInstance] = stardust.useState();

      stardust.useEffect(() => {
        const p = picasso().chart({
          element,
          data: [],
          settings: {},
        });

        setInstance(p);

        return () => {
          p.destroy();
        };
      }, []);

      stardust.useEffect(() => {
        if (!instance) {
          return;
        }

        instance.update({
          data: [
            {
              type: 'q',
              key: 'qHyperCube',
              data: layout.qHyperCube,
            },
          ],
          settings: {
    scales: {
      s: {
        data: { field: 'qMeasureInfo/0' },
        expand: 0.2,
        invert: true,
      },
      m: {
        data: { field: 'qMeasureInfo/1' },
        expand: 0.2,
      },
      col: {
        data: { extract: { field: "=pick(aggr(KMeans2D(vDistClusters, only(Lat), only(Long)), FID)+1, 'Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5')"} },
        type: 'categorical-color',
        range: ['#0B84A5', '#F6C85F', '#6F4E7C', '#9DD866', '#CA472F']
                  ,
      },
    },
    interactions: [
              {
                type: "native",
                events: {
                  mousemove(e) {
                    //console.log(e)
                    const tooltip = this.chart.component("t");
                    tooltip.emit("show", e);
                  },
                  mouseleave(e) {
                    const tooltip = this.chart.component("t");
                    tooltip.emit("hide");
                  }
                }
              }
            ],
    components: [{
      key: 'y-axis',
      type: 'axis',
      scale: 'm',
      dock: 'left',
    }, {
      key: 'x-axis',
      type: 'axis',
      scale: 's',
      dock: 'bottom',
    },
    {
      key: "t",
      type: "tooltip",
      settings:{
        duration: 10000,
        extract: ({ node, resources }) => console.log(node) || node.data.label,
         placement: {
        type: 'pointer',
        dock: 'top',
        offset: 10,
        area: 'viewport'
      }
        },
      },

      {
      type: 'legend-cat',
      key: 'legend',
      dock: 'right',
      scale: 'col',
      brush: {
        trigger: [{
          on: 'tap',
          contexts: ['select'],
        }],
        consume: [{
          context: 'select',
          style: {
            active: {
              opacity: 1,
            },
            inactive: {
              opacity: 0.5,
            },
          },
        }],
      },
    }, 

    {
      key: 'point',
      type: 'point',
      data: {
        extract: {
          field: "=pick(aggr(KMeans2D(vDistClusters, only(Lat), only(Long)), FID)+1, 'Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5')",
          props: {
            y: { field: 'qMeasureInfo/0' },
            x: { field: 'qMeasureInfo/1' },
          },
        },
      },
      
      settings: {
        x: { scale: 'm' },
        y: { scale: 's' },
        shape: 'n-polygon',
        size: 0.4,
        strokeWidth: 2,
        stroke: '#fff',
        opacity: 0.8,
        fill: { scale: 'col' },
      },
      brush: {
        trigger: [{
          on: 'tap',
          contexts: ['selection','tooltip'],
        }],
        consume: [{
          context: 'selection',
          style: {
            active: {
              opacity: 1,
            },
            inactive: {
              opacity: 0.5,
            },
          },
        }],
      },
    }],
  },
        });
      }, [layout, instance]);

      stardust.useEffect(() => {
        if (!instance) {
          return;
        }
        instance.update();
      }, [rect.width, rect.height, instance]);
    },
  };
}
