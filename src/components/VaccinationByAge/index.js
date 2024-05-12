// Write your code here
import {Pie, PieChart, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {data} = props
  return (
    <div className="vaccination-age-container">
      <h1 className="vaccination-age-heading">Vaccination by age</h1>
      <PieChart width={1000} height={300} data={data} margin={{top: 5}}>
        <Pie
          cx="50%"
          cy="50%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill=" #2d87bb" />
          <Cell name="45-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          className="pie-chart-container"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
