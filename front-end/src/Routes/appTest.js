import React, { useContext } from "react";
import { AuthProvider, AuthContext } from "./AuthProvier";

const UserProfile = () => {
  const [user, setUser] = useContext(AuthContext);

  return (
    <div>
      Olá {user.name}
      <button onClick={() => setUser(false)}>Sair</button>
    </div>
  );
};

const Login = () => {
  const [, setUser] = useContext(AuthContext);

  return <button onClick={() => setUser({ name: "Bruno" })}>Entrar</button>;
};

const Main = () => {
  const [user] = useContext(AuthContext);
  return user ? <UserProfile /> : <Login />;
};

export default function App() {
  return (
    <AuthProvider> 
      <>
        <h1>Codar.me - React Context API</h1>
        <Main />
      </>
    </AuthProvider>
  );
}
