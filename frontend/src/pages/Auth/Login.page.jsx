import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBoundStore from "../../store/Store";

import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import classes from './Auth.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginService, authLoading, user } = useBoundStore((state) => state);

  useEffect(() => {
    if (!!user) {
      navigate("/posts");
    }
  }, [user]);

  const onLogin = async (e) => {
    e.preventDefault();
    let email = e.target.email?.value;
    let password = e.target.password?.value;
    if (!email || !password) return;
    loginService(email, password);
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={onLogin}>
          <TextInput
            label="Email" 
            name="email" 
            type="email"
            placeholder="john@example.org" 
            required 
          />
          <PasswordInput
            label="Password"
            name="password"
            type="password"
            placeholder="********" 
            required mt="md"
          />
          <Button fullWidth mt="xl" type="submit">
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
  // Add under button? --> {authLoading ? <p className="loading">Loading...</p> : null}
};

export default LoginPage;