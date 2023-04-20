```mermaid
erDiagram

  "User" {
    String id "🗝️"
    String name "❓"
    String email "❓"
    DateTime emailVerified "❓"
    }


  "sprints" {
    Int id "🗝️"
    String name
    DateTime start_date
    DateTime end_date
    }


  "stories" {
    String key "🗝️"
    Int sprint_id "❓"
    String summary
    Int story_point "❓"
    }


  "tasks" {
    String key "🗝️"
    Int sprint_id "❓"
    String summary
    String assignee "❓"
    Int estimated_time "❓"
    Int spent_time "❓"
    }

    "sprints" o{--}o "tasks" : "tasks"
    "sprints" o{--}o "stories" : "stories"
    "stories" o|--|o "sprints" : "sprint"
    "tasks" o|--|o "sprints" : "sprint"
```
