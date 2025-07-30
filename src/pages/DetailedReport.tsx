import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DetailedReport: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-dashboard-bg">
      {/* Left Sidebar */}
      <div className="w-80 bg-dashboard-sidebar p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-dashboard-sidebar-text text-2xl font-bold mb-2">
            Data Services
          </h1>
          <div className="text-dashboard-sidebar-text text-sm opacity-90">
            Resource TP Allocation Dashboard
          </div>
        </div>

        <div className="flex-1">
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="w-full mb-4 bg-white/10 border-white/20 text-dashboard-sidebar-text hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* User Info and Logout */}
        <div className="mt-8 pt-4 border-t border-white/20">
          <div className="text-dashboard-sidebar-text text-sm mb-3">
            Welcome, {user?.name}
          </div>
          <Button 
            onClick={logout}
            variant="outline"
            size="sm"
            className="w-full bg-white/10 border-white/20 text-dashboard-sidebar-text hover:bg-white/20"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-dashboard-text text-2xl">Detailed Report View</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-dashboard-text">Resource Utilization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Active Projects:</span>
                        <span className="font-semibold">28</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Available Resources:</span>
                        <span className="font-semibold">35</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bench Resources:</span>
                        <span className="font-semibold">15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Utilization Rate:</span>
                        <span className="font-semibold text-dashboard-teal">78%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-dashboard-text">Department Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Technology:</span>
                        <span className="font-semibold">45%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Data Science:</span>
                        <span className="font-semibold">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Consulting:</span>
                        <span className="font-semibold">20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Operations:</span>
                        <span className="font-semibold">10%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-dashboard-text">Aging Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">32</div>
                      <div className="text-sm text-green-700">0-30 days</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">18</div>
                      <div className="text-sm text-yellow-700">31-60 days</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">8</div>
                      <div className="text-sm text-orange-700">61-90 days</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">3</div>
                      <div className="text-sm text-red-700">90+ days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-dashboard-text">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average Time to Assignment:</span>
                      <span className="font-semibold">40 days</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Resource Retention Rate:</span>
                      <span className="font-semibold text-green-600">92%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Client Satisfaction Score:</span>
                      <span className="font-semibold text-dashboard-teal">4.7/5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Skills Match Accuracy:</span>
                      <span className="font-semibold text-green-600">89%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailedReport;