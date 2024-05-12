// Write your code here
import {Pie, PieChart, Legend, Cell} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {data} = props

  return (
    <div className="vaccination-gender-container">
      <h1 className="vaccination-gender-heading">Vaccination by gender</h1>
      <PieChart width={1000} height={300} data={data} margin={{top: 5}}>
        <Pie
          cx="50%"
          cy="75%"
          data={data}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill=" #2d87bb" />
          <Cell name="Female" fill="#f54394" />
          <Cell name="Others" fill="#64c2a6" />
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

export default VaccinationByGender
