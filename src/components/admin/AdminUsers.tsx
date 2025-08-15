import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  User, 
  Users, 
  Clock,
  Calendar,
  Mail,
  Shield
} from "lucide-react";

export function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock user data
  const parentUsers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      children: 2,
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
      status: "active",
      subscription: "premium"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@email.com", 
      children: 1,
      joinDate: "2024-02-03",
      lastActive: "1 day ago",
      status: "active",
      subscription: "free"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@email.com",
      children: 3,
      joinDate: "2023-11-22",
      lastActive: "5 days ago",
      status: "inactive",
      subscription: "premium"
    }
  ];

  const childUsers = [
    {
      id: 1,
      name: "Alex Johnson",
      age: 10,
      parent: "Sarah Johnson",
      courses: 3,
      totalXP: 2450,
      currentStreak: 7,
      lastActive: "1 hour ago",
      crownLevels: 15
    },
    {
      id: 2,
      name: "Emma Johnson", 
      age: 12,
      parent: "Sarah Johnson",
      courses: 4,
      totalXP: 3210,
      currentStreak: 12,
      lastActive: "30 min ago",
      crownLevels: 22
    },
    {
      id: 3,
      name: "Lucas Chen",
      age: 11,
      parent: "Michael Chen",
      courses: 2,
      totalXP: 1680,
      currentStreak: 3,
      lastActive: "2 days ago",
      crownLevels: 9
    }
  ];

  const userStats = {
    totalParents: 1247,
    totalChildren: 2156,
    activeToday: 456,
    newThisWeek: 34,
    avgChildrenPerParent: 1.7
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage parent and child accounts
          </p>
        </div>
        <Button>
          Add User
        </Button>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Parents</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalParents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{userStats.newThisWeek} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Children</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.totalChildren.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Avg {userStats.avgChildrenPerParent} per parent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.activeToday}</div>
            <p className="text-xs text-muted-foreground">
              Parents & children combined
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.newThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              New registrations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Users</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">
              Of active parents
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* User Tables */}
      <Tabs defaultValue="parents" className="space-y-6">
        <TabsList>
          <TabsTrigger value="parents">Parent Accounts</TabsTrigger>
          <TabsTrigger value="children">Child Profiles</TabsTrigger>
        </TabsList>

        <TabsContent value="parents">
          <Card>
            <CardHeader>
              <CardTitle>Parent Accounts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Children</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscription</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {parentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.children}</TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.subscription === 'premium' ? 'default' : 'outline'}>
                          {user.subscription}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="children">
          <Card>
            <CardHeader>
              <CardTitle>Child Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Parent</TableHead>
                    <TableHead>Courses</TableHead>
                    <TableHead>Total XP</TableHead>
                    <TableHead>Current Streak</TableHead>
                    <TableHead>Crown Levels</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {childUsers.map((child) => (
                    <TableRow key={child.id}>
                      <TableCell className="font-medium">{child.name}</TableCell>
                      <TableCell>{child.age}</TableCell>
                      <TableCell>{child.parent}</TableCell>
                      <TableCell>{child.courses}</TableCell>
                      <TableCell>{child.totalXP.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={child.currentStreak > 7 ? 'default' : 'secondary'}>
                          {child.currentStreak} days
                        </Badge>
                      </TableCell>
                      <TableCell>{child.crownLevels}</TableCell>
                      <TableCell>{child.lastActive}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}