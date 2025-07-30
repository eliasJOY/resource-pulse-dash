import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { LogOut, Users, Clock, AlertTriangle, RotateCcw, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { 
  mockResourceData, 
  mockStatusData, 
  mockTrendsData, 
  mockBreakdownData, 
  filterOptions 
} from '@/data/mockData';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    period: 'current',
    startDate: '',
    endDate: '',
    statusCategory: '',
    agingGroup: '',
    skill: '',
    domain: '',
    location: ''
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Filter resource data based on current filters
  const filteredData = mockResourceData.filter(resource => {
    if (filters.statusCategory && resource.status !== filters.statusCategory) return false;
    if (filters.skill && resource.skill !== filters.skill) return false;
    if (filters.domain && resource.domain !== filters.domain) return false;
    if (filters.location && resource.location !== filters.location) return false;
    return true;
  });

  // Calculate KPIs
  const totalResources = filteredData.length;
  const averageTpAge = 40; // Mock value
  const oldestOver90Days = filteredData.filter(r => parseInt(r.ageing) > 90).length;
  const avgDaysToReassign = 40; // Mock value

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

        {/* Navigation */}
        <div className="mb-6">
          <Button 
            onClick={() => navigate('/detailed-report')}
            variant="outline"
            className="w-full bg-white/10 border-white/20 text-dashboard-sidebar-text hover:bg-white/20"
          >
            <FileText className="mr-2 h-4 w-4" />
            Detailed Report View
          </Button>
        </div>

        {/* Filters */}
        <div className="space-y-4 flex-1">
          <div>
            <Label className="text-dashboard-sidebar-text text-sm font-medium">Period</Label>
            <Select value={filters.period} onValueChange={(value) => handleFilterChange('period', value)}>
              <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-dashboard-sidebar-text">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="current">Current Period</SelectItem>
                <SelectItem value="last30">Last 30 Days</SelectItem>
                <SelectItem value="last60">Last 60 Days</SelectItem>
                <SelectItem value="last90">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-dashboard-sidebar-text text-sm font-medium">Start Date</Label>
            <Input 
              type="date" 
              value={filters.startDate}
              onChange={(e) => handleFilterChange('startDate', e.target.value)}
              className="mt-1 bg-white/10 border-white/20 text-dashboard-sidebar-text"
            />
          </div>

          <div>
            <Label className="text-dashboard-sidebar-text text-sm font-medium">End Date</Label>
            <Input 
              type="date" 
              value={filters.endDate}
              onChange={(e) => handleFilterChange('endDate', e.target.value)}
              className="mt-1 bg-white/10 border-white/20 text-dashboard-sidebar-text"
            />
          </div>

          <div>
            <Label className="text-dashboard-sidebar-text text-sm font-medium">Status Category</Label>
            <Select value={filters.statusCategory} onValueChange={(value) => handleFilterChange('statusCategory', value)}>
              <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-dashboard-sidebar-text">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="">All Statuses</SelectItem>
                {filterOptions.statusCategories.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-dashboard-sidebar-text text-sm font-medium">Aging Group</Label>
            <Select value={filters.agingGroup} onValueChange={(value) => handleFilterChange('agingGroup', value)}>
              <SelectTrigger className="mt-1 bg-white/10 border-white/20 text-dashboard-sidebar-text">
                <SelectValue placeholder="All Age Groups" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="">All Age Groups</SelectItem>
                {filterOptions.agingGroups.map(group => (
                  <SelectItem key={group} value={group}>{group}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-dashboard-text">Total Resources</CardTitle>
              <Users className="h-4 w-4 text-dashboard-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dashboard-text">{totalResources} members</div>
              <div className="text-xs text-muted-foreground mt-1">
                The sum of all resource across all groups (Sample)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-dashboard-text">Average TP age</CardTitle>
              <Clock className="h-4 w-4 text-dashboard-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dashboard-text">{averageTpAge} days</div>
              <div className="text-xs text-muted-foreground mt-1">
                The average number of days employees have been on TP for 90+ days (Sample)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-dashboard-text">Oldest (&gt; 90 days)</CardTitle>
              <AlertTriangle className="h-4 w-4 text-dashboard-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dashboard-text">{oldestOver90Days} resources</div>
              <div className="text-xs text-muted-foreground mt-1">
                Resources who have been on TP for more than 90 days (Sample)
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-dashboard-text">Average days to re-assign</CardTitle>
              <RotateCcw className="h-4 w-4 text-dashboard-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-dashboard-text">{avgDaysToReassign} days</div>
              <div className="text-xs text-muted-foreground mt-1">
                Average number of days for a resource to move to new project (Sample)
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-dashboard-text">Status - Sample</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4DB6AC" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-dashboard-text">Trends - Sample</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="available" stroke="#4DB6AC" strokeWidth={2} />
                  <Line type="monotone" dataKey="onProject" stroke="#81C784" strokeWidth={2} />
                  <Line type="monotone" dataKey="onBench" stroke="#FFB74D" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-dashboard-text">Domain Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mockBreakdownData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                  >
                    {mockBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-dashboard-text">Resource Details</CardTitle>
            <div className="flex gap-4 mt-4">
              <Select value={filters.skill} onValueChange={(value) => handleFilterChange('skill', value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Skill" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Skills</SelectItem>
                  {filterOptions.skills.map(skill => (
                    <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.domain} onValueChange={(value) => handleFilterChange('domain', value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Domains</SelectItem>
                  {filterOptions.domains.map(domain => (
                    <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filters.location} onValueChange={(value) => handleFilterChange('location', value)}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Locations</SelectItem>
                  {filterOptions.locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>UID</TableHead>
                  <TableHead>Resource Name</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Current Status</TableHead>
                  <TableHead>Primary Skill</TableHead>
                  <TableHead>Experience</TableHead>
                  <TableHead>Ageing</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((resource) => (
                  <TableRow key={resource.uid}>
                    <TableCell className="font-medium">{resource.uid}</TableCell>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>{resource.domain}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        resource.status === 'Available' ? 'bg-green-100 text-green-800' :
                        resource.status === 'On Project' ? 'bg-blue-100 text-blue-800' :
                        resource.status === 'On Bench' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {resource.status}
                      </span>
                    </TableCell>
                    <TableCell>{resource.skill}</TableCell>
                    <TableCell>{resource.experience}</TableCell>
                    <TableCell className={parseInt(resource.ageing) > 90 ? 'text-red-600 font-semibold' : ''}>
                      {resource.ageing}
                    </TableCell>
                    <TableCell>{resource.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;