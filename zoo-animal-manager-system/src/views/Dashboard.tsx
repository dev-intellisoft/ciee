
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import StatCard from "@/components/dashboard/StatCard";
import { Landmark, ShieldPlus, Globe, PawPrint } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
// import  dashboardSlice from "@/viewmodels/DashboardViewModel.ts";
import {dashboardActions} from "@/viewmodels/DashboardViewModel.ts";


const COLORS = ['#2D7D58', '#4CAF50', '#8B5A2B', '#D2B48C', '#87CEEB'];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const {
    animalCount,
    careCount,
    habitatStats,
    careStats,
    loading
  } = useAppSelector(state => state.dashboard);

  useEffect(() => {
    dispatch(dashboardActions.fetchDashboardDataRequest());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-lg">Loading dashboard data...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Animals"
              value={animalCount}
              icon={<Landmark className="h-5 w-5 text-zoo-primary" />}
            />
            <StatCard
              title="Care Types"
              value={careCount}
              icon={<ShieldPlus className="h-5 w-5 text-zoo-secondary" />}
            />
            <StatCard
              title="Habitats"
              value={habitatStats.length}
              icon={<PawPrint className="h-5 w-5 text-zoo-earth" />}
            />
            <StatCard
              title="Countries"
              value={[...new Set(habitatStats.map(h => h.habitat))].length}
              icon={<Globe className="h-5 w-5 text-zoo-accent" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Animals by Habitat</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={habitatStats}
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
                      data={careStats}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="count"
                      nameKey="careName"
                      label={({ careName, percent }) => `${careName}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {careStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
