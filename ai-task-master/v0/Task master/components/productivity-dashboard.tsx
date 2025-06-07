import { TrendingUp, CheckCircle, Clock, Target } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProductivityDashboardProps {
  tasks: any[]
}

export function ProductivityDashboard({ tasks }: ProductivityDashboardProps) {
  const completedTasks = tasks.filter((task) => task.completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const highPriorityTasks = tasks.filter((task) => task.priority === "high").length
  const overdueTasks = tasks.filter((task) => {
    const today = new Date().toISOString().split("T")[0]
    return task.dueDate < today && !task.completed
  }).length

  const weeklyData = [
    { day: "Mon", completed: 8, total: 12 },
    { day: "Tue", completed: 6, total: 10 },
    { day: "Wed", completed: 9, total: 11 },
    { day: "Thu", completed: 7, total: 9 },
    { day: "Fri", completed: 5, total: 8 },
    { day: "Sat", completed: 3, total: 5 },
    { day: "Sun", completed: 2, total: 4 },
  ]

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{completedTasks}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{Math.round(completionRate)}%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Clock className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{overdueTasks}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">High Priority</p>
              <p className="text-2xl font-bold text-gray-900">{highPriorityTasks}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Progress</h3>
        <div className="space-y-4">
          {weeklyData.map((day) => (
            <div key={day.day} className="flex items-center space-x-4">
              <div className="w-12 text-sm font-medium text-gray-600">{day.day}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">
                    {day.completed} of {day.total} tasks
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {Math.round((day.completed / day.total) * 100)}%
                  </span>
                </div>
                <Progress value={(day.completed / day.total) * 100} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Project Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Breakdown</h3>
        <div className="space-y-4">
          {["Finance", "Marketing", "Personal", "General"].map((project) => {
            const projectTasks = tasks.filter((task) => task.project === project)
            const projectCompleted = projectTasks.filter((task) => task.completed).length
            const projectTotal = projectTasks.length
            const projectRate = projectTotal > 0 ? (projectCompleted / projectTotal) * 100 : 0

            return (
              <div key={project} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  <span className="font-medium text-gray-900">{project}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {projectCompleted}/{projectTotal} tasks
                  </span>
                  <div className="w-24">
                    <Progress value={projectRate} className="h-2" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12">{Math.round(projectRate)}%</span>
                </div>
              </div>
            )
          })}
        </div>
      </Card>

      {/* AI Insights */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights</h3>
        <div className="space-y-3">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Productivity Tip:</strong> You're most productive on Wednesdays. Consider scheduling important
              tasks on this day.
            </p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Attention Needed:</strong> You have {overdueTasks} overdue tasks. Consider rescheduling or
              breaking them into smaller tasks.
            </p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Great Progress:</strong> You've completed {completedTasks} tasks this week. Keep up the momentum!
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
