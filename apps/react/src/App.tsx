import "./App.css";
import { useSprints, useTasks, useTaskSummaries } from "../api/hooks";
import { Select } from "@mantine/core";
import { useState } from "react";

function App() {
  const [selectedSprint, setSelectedSprint] = useState<string | null>(null);
  const {
    data: sprints,
    isLoading: sprintLoading,
    error: sprintError,
  } = useSprints();
  const {
    data: tasks,
    isLoading: taskLoading,
    error: taskError,
  } = useTasks(selectedSprint !== null ? Number(selectedSprint) : undefined);
  const {
    data: taskSummaries,
    isLoading: taskSummaryLoading,
    error: taskSummaryError,
  } = useTaskSummaries(
    selectedSprint !== null ? Number(selectedSprint) : undefined
  );

  if (sprintLoading || taskLoading || taskSummaryLoading)
    return <div>Loading...</div>;
  if (sprintError || taskError || taskSummaryError)
    return (
      <div>
        {`Error: ${
          sprintError?.message || taskError?.message || taskSummaryError || ""
        }`}
      </div>
    );

  return (
    <div className="App">
      <Select
        label="Sprints"
        placeholder="Select sprint"
        clearable
        searchable
        nothingFound="No options"
        maxDropdownHeight={280}
        value={selectedSprint}
        onChange={setSelectedSprint}
        data={sprints.map((sprint) => ({
          value: sprint.id + "",
          label: sprint.name,
        }))}
      />
      <ul>
        {tasks.map((task) => (
          <li key={task.key}>{JSON.stringify(task)}</li>
        ))}
      </ul>
      <ul>
        {taskSummaries.map((taskSummary) => (
          <li key={taskSummary.assignee}>{JSON.stringify(taskSummary)}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
