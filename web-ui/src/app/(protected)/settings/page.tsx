import { Container, Stack, Typography } from "@mui/material";

export default async function Settings() {
  return (
    <main>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Typography variant="h3">Settings</Typography>
        </Stack>
      </Container>
    </main>
  );
}
