import { ChartContainer } from '@mui/x-charts/ChartContainer';
import {
  LinePlot,
  MarkPlot,
  lineElementClasses,
  markElementClasses,
} from '@mui/x-charts/LineChart';

const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  'Page A',
  'Page B',
  'Page C',
  'Page D',
  'Page E',
  'Page F',
  'Page G',
];

function Cart({ value }) {
    return (
        <div className="cart">
            <h4>{ value }</h4>
            <ChartContainer
                width={400}
                height={100}
                series={[{ type: 'line', data: pData }]}
                xAxis={[{ scaleType: 'point', data: xLabels, position: 'none' }]}
                yAxis={[{ position: 'none' }]}
                sx={{
                    [`& .${lineElementClasses.root}`]: {
                    stroke: '#8884d8',
                    strokeWidth: 1,
                    },
                    [`& .${markElementClasses.root}`]: {
                    stroke: '#8884d8',
                    r: 3, // Modify the circle radius
                    fill: '#fff',
                    strokeWidth: 1,
                    },
                }}
                disableAxisListener
                >
                <LinePlot />
                <MarkPlot />
            </ChartContainer>
        </div>
    )
}

export default Cart
