
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend,
  LineChart,
  Line
} from "recharts";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import { dashboardActions } from "@/store/dashboard/dashboardSlice";

const COLORS = ['#2D7D58', '#4CAF50', '#8B5A2B', '#D2B48C', '#87CEEB', '#5D4037', '#009688', '#FFC107'];

const Statistics = () => {
  const dispatch = useAppDispatch();
  const { 
    habitatStats, 
    countryStats, 
    careStats, 
    ageDistribution,
    loading
  } = useAppSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(dashboardActions.fetchDashboardDataRequest());
  }, [dispatch]);

  // Ensure careStats is always an array
  const safeHabitatStats = Array.isArray(habitatStats) ? habitatStats : [];
  const safeCountryStats = Array.isArray(countryStats) ? countryStats : [];
  const safeCareStats = Array.isArray(careStats) ? careStats : [];
  const safeAgeDistribution = Array.isArray(ageDistribution) ? ageDistribution : [];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Statistics</h1>
      
      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-lg">Loading statistics data...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Animals by Habitat</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={safeHabitatStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="habitat" angle={-45} textAnchor="end" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#2D7D58" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Animals by Care Type</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={safeCareStats}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="careName"
                    label={({ careName, percent }) => `${careName}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {safeCareStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Animals by Country of Origin</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={safeCountryStats}
                  margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="country" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8B5A2B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Age Distribution</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={safeAgeDistribution}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ageGroup" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="count" stroke="#87CEEB" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Statistics;
