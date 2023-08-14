import { Container, Stack, Typography } from "@mui/material";
import { LoginForm } from "../_components";

export default async function Home() {
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
