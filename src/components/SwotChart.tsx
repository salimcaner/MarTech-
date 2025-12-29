import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
    {
        subject: 'Güçlü Yönler',
        A: 120,
        fullMark: 150,
    },
    {
        subject: 'Zayıf Yönler',
        A: 86,
        fullMark: 150,
    },
    {
        subject: 'Fırsatlar',
        A: 99,
        fullMark: 150,
    },
    {
        subject: 'Tehditler',
        A: 65,
        fullMark: 150,
    },
];

const SwotChart = () => {
    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
                    <PolarGrid stroke="#374151" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                        name="SWOT Analizi"
                        dataKey="A"
                        stroke="#FFB84D"
                        strokeWidth={2}
                        fill="#FFB84D"
                        fillOpacity={0.4}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#F3F4F6'
                        }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SwotChart;
