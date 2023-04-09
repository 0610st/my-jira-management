import "./App.css";
import { User } from "./types";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

const getUsers = async () => {
  const res = await axios.get<User[]>(`${import.meta.env.VITE_API_URL}/user`);
  return res.data;
};
const useUsers = () => useQuery<User[], AxiosError>(["users"], getUsers);

function App() {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="App">
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            {user.id} {user.name} {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
