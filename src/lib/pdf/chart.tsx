import { View, Text, Svg, Rect } from "@react-pdf/renderer"
import { GOLD, MID_GREY } from "./styles"

interface BarChartProps {
  data: { label: string; value: number }[]
  width?: number
}

export function HorizontalBarChart({ data, width = 420 }: BarChartProps) {
  const maxVal = 100
  const barHeight = 12
  const gap = 6
  const labelWidth = 130
  const chartArea = width - labelWidth - 40
  const height = data.length * (barHeight + gap) + 10

  return (
    <View style={{ width, height, marginVertical: 8 }}>
      {data.map((item, i) => {
        const barW = Math.max(2, (item.value / maxVal) * chartArea)
        const y = i * (barHeight + gap)
        return (
          <View key={i} style={{ flexDirection: "row", alignItems: "center", position: "absolute", left: 0, top: y, height: barHeight }}>
            <Text style={{ width: labelWidth, fontSize: 9, color: "#22252A", textAlign: "right", paddingRight: 8 }}>
              {item.label}
            </Text>
            <Svg width={chartArea} height={barHeight}>
              <Rect x={0} y={0} width={chartArea} height={barHeight} fill={MID_GREY} opacity={0.15} rx={2} />
              <Rect x={0} y={0} width={barW} height={barHeight} fill={GOLD} rx={2} />
            </Svg>
            <Text style={{ fontSize: 8, color: MID_GREY, marginLeft: 4 }}>
              {Math.round(item.value)}%
            </Text>
          </View>
        )
      })}
    </View>
  )
}
