import { BarChart } from '@mui/x-charts/BarChart';
import Title from '../../../ui/Title';

export default function AdminBarChart() {
  return (
    <>
      <Title title="Statistika" />
      <BarChart
        xAxis={[{ data: ['group A', 'group B', 'group C'] }]}
        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
        height={300}
      />
    </>
  );
}
