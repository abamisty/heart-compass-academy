import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Eye,
  Flag,
  Users,
  FileText
} from "lucide-react";

export function AdminSafety() {
  // Mock safety data
  const safetyAlerts = [
    {
      id: 1,
      type: "inappropriate_content",
      content: "User-generated text in exercise response",
      user: "Child ID: 1247",
      severity: "high",
      status: "pending",
      timestamp: "2024-01-20 14:30",
      description: "Potential inappropriate language detected"
    },
    {
      id: 2,
      type: "unusual_activity",
      content: "Rapid exercise completion pattern",
      user: "Child ID: 889",
      severity: "medium",
      status: "reviewing",
      timestamp: "2024-01-20 13:45",
      description: "Completing exercises unusually fast"
    },
    {
      id: 3,
      type: "privacy_concern",
      content: "Personal information shared",
      user: "Child ID: 2156",
      severity: "high",
      status: "resolved",
      timestamp: "2024-01-20 10:15",
      description: "Child attempted to share personal details"
    }
  ];

  const contentReviews = [
    {
      id: 1,
      contentType: "exercise_response",
      content: "I live at 123 Main Street...",
      flaggedBy: "automated_system",
      reason: "personal_information",
      status: "requires_action",
      timestamp: "2024-01-20 15:00"
    },
    {
      id: 2,
      contentType: "lesson_feedback",
      content: "This lesson is stupid and boring",
      flaggedBy: "parent_report",
      reason: "inappropriate_language",
      status: "reviewed",
      timestamp: "2024-01-20 14:20"
    }
  ];

  const safetyStats = {
    totalAlerts: 47,
    activeAlerts: 8,
    resolvedToday: 12,
    avgResponseTime: "18 min",
    contentScanned: 15678,
    violationsFound: 23,
    coppaCompliance: 99.8,
    parentReports: 5
  };

  const complianceChecks = [
    { name: "COPPA Age Verification", status: "passing", score: 99.8, lastCheck: "2024-01-20" },
    { name: "Content Moderation", status: "passing", score: 97.2, lastCheck: "2024-01-20" },
    { name: "Data Privacy Controls", status: "passing", score: 100, lastCheck: "2024-01-19" },
    { name: "Parental Consent", status: "warning", score: 94.1, lastCheck: "2024-01-20" },
    { name: "Safety Policies", status: "passing", score: 98.5, lastCheck: "2024-01-20" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'default';
      case 'reviewing': return 'secondary';
      case 'pending': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Safety Monitoring</h1>
        <p className="text-muted-foreground mt-2">
          Child safety and content moderation dashboard
        </p>
      </div>

      {/* Safety Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safetyStats.activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {safetyStats.resolvedToday} resolved today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safetyStats.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">
              Average response time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Scanned</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safetyStats.contentScanned.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {safetyStats.violationsFound} violations found
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">COPPA Compliance</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{safetyStats.coppaCompliance}%</div>
            <p className="text-xs text-muted-foreground">
              Compliance score
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="alerts">Safety Alerts</TabsTrigger>
          <TabsTrigger value="content">Content Review</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Safety Alert Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {safetyAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.type.replace('_', ' ')}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{alert.content}</div>
                          <div className="text-sm text-muted-foreground">{alert.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>{alert.user}</TableCell>
                      <TableCell>
                        <Badge variant={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(alert.status)}>
                          {alert.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{alert.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flag className="h-5 w-5" />
                Content Moderation Queue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Content Type</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Flagged By</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead className="w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contentReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>{review.contentType.replace('_', ' ')}</TableCell>
                      <TableCell className="max-w-xs truncate">{review.content}</TableCell>
                      <TableCell>{review.flaggedBy.replace('_', ' ')}</TableCell>
                      <TableCell>{review.reason.replace('_', ' ')}</TableCell>
                      <TableCell>
                        <Badge variant={review.status === 'requires_action' ? 'destructive' : 'default'}>
                          {review.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>{review.timestamp}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {complianceChecks.map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{check.name}</span>
                          <Badge variant={check.status === 'passing' ? 'default' : 'secondary'}>
                            {check.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Score: {check.score}%</span>
                          <span>Last Check: {check.lastCheck}</span>
                        </div>
                      </div>
                      <div className="w-32">
                        <Progress value={check.score} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Safety Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Content Filtering</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Age Verification</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Parental Controls</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Encryption</span>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <span className="font-medium">Policy Update:</span> Content guidelines revised
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Audit Complete:</span> COPPA compliance check passed
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Alert Resolved:</span> False positive on exercise content
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">Training Update:</span> Staff safety protocols refreshed
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}