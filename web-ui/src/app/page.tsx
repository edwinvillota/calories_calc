import { Container, Stack, Typography } from "@mui/material";
import { LoginForm } from "./components";

export default function Home() {
  return (
    <main>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Typography variant="h3">Calories calc</Typography>
          <LoginForm />
        </Stack>
      </Container>
    </main>
  );
}
