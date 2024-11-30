import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

const Chart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const myChart = echarts.init(chartRef.current);

      const option: EChartsOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#84DD71',
            },
          },
        },
        legend: {
          data: ['Sleep Hours'],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        dataZoom: [
            {
              type: 'slider', 
              start: 0, 
              end: 100, 
            },
            {
              type: 'inside', 
              start: 0,
              end: 100,
            },
          ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Hours',
          },
        ],
        color: ['#9DE38F', '#40a9ff', '#73d13d', '#ffa940', '#9254de'],
        series: [
          {
            name: 'Sleep Hours',
            type: 'line',
            stack: 'Total',
            areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#6CD753' }, 
                    { offset: 1, color: '#CAF0C1' },
                  ],
                },
              },
            emphasis: {
              focus: 'series',
            },
            data: [5.0, 5.2, 5.4, 6.0, 6.8, 7.4, 7.0, 6.5, 6.2, 6.0, 6.8, 7.2],
            lineStyle: {
                color: '#6CD753', 
                width: 3,
              },
          },
          
        ],
      };
      

      myChart.setOption(option);

      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default Chart;
