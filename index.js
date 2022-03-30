/* eslint-disable */
import embed from './configure';
import connect from './connect';
import picassojs from 'picasso.js';
import picassoQ from 'picasso-plugin-q';
// import radarChartSn from './radar-chart-sn';

async function run() {
  const app = await connect({
    url: 'https://incognito.us.qlikcloud.com',
    webIntegrationId: '<ID>',
    // appId: '9ac12af2-b81e-41bd-bb0c-e217921e4f0b',
    appId: '<ID>',
  });

  const n = embed(app, {
    context: {theme: "dark"}
  });

  (await n.selections()).mount(document.querySelector('.toolbar'));

    n.render({
      element: document.querySelector(".object"),
      type: 'barchart',
      id: 'UzPrne',
    })

    n.render({
      element: document.querySelector(".radar"),
      type: 'linechart',
      id: 'pmgCfAu'
    })

    n.render({
      element: document.querySelector(".object_new"),
      type: 'barchart',
      id: 'nTzkMC'
    })
   
         n.render({
          element: document.querySelector(".custom_scat"),
          type: 'custom-scat',
          // fields: ['Sport','=Avg(Height)','=Avg(Weight)'],
          fields: [{
        qDef: {
          qFieldDefs: ["FID"],
          qFieldLabels: ["FID"]
        },
        qAttributeDimensions: [
          {
            qDef:
              "=pick(aggr(KMeans2D(vDistClusters, only(Lat), only(Long)), FID)+1, 'Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5')",
            qAttribute: true,
            id: "colorByAlternative",
            label: "Cluster id"
          }
        ]
      },
      "=Avg(Lat)",
      "=Avg(Long)"],

       properties: {
      title: "Toronto locations clustered by Lat-Long",
      color: {
        auto: false,
        mode: "byDimension",
        byDimDef: {
          type: "expression",
          key:
            "=pick(aggr(KMeans2D(vDistClusters, only(Lat), only(Long)), FID)+1, 'Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5')",
          label: "Cluster id"
        }
      }
    }
          // fields: ['Sex','Team','=Count(Games)'],
        })

}

run();
