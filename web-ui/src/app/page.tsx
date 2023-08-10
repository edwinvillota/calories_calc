import { Container, Stack, Typography } from "@mui/material";
import { LoginForm } from "./_components";
import { UserService } from "./_services";

export default async function Home() {
  const data = await UserService.me();

  console.log({ data });

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
