import { Container, Stack, Typography } from "@mui/material";

export default async function Dashboard() {
  return (
    <main>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Typography variant="h3">Dashboard</Typography>
        </Stack>
      </Container>
    </main>
  );
}
