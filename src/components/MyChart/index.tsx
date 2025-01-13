import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { PureComponent } from "react"

interface MyChartItem {
    tipo :string
    quantidade :number
}

interface MyChartProps extends PureComponent {
    data :MyChartItem[]
}

interface ChartConfig {
    [key: string]: {
      label: string;
      color: string;
    };
  }

export default function MyChart({ data } :MyChartProps) {
    
const chartConfig :ChartConfig = {
    tipo: {
        label: 'Tipo',
        color: "#2563eb", 
    }
} satisfies ChartConfig

const COLORS = ['#15803d', '#ff0000', '#fb923c', '#facc15', '#1d4ed8']

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
cx,
cy,
midAngle,
innerRadius,
outerRadius,
percent,
index,
}: any) => {
const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
const x = cx + radius * Math.cos(-midAngle * RADIAN);
const y = cy + radius * Math.sin(-midAngle * RADIAN);
const currentEntry :MyChartItem = data[index]
    return (
        currentEntry.quantidade > 0
        ?
            <text
                x={x}
                y={y}
                fill="black"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                >
                {`${(percent * 100).toFixed(0)}% - ${currentEntry.tipo}`}
            </text>
        :
            null
    )
}


    return(
            <PieChart accessibilityLayer width={550} height={400} className="bg-inherit">
                <Pie 
                    data={data} 
                    dataKey="quantidade" 
                    nameKey="tipo" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    fill="#8884d8"
                    label={renderCustomizedLabel}
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                </Pie>
            </PieChart>
    )
}