"use client";
import { Button, Grid, TextField } from "@mui/material";
import { signOut } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container direction="column" spacing={4}>
        <Grid item>
          <TextField
            fullWidth
            {...register("email")}
            name="email"
            label="Email"
            type="text"
          />
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            {...register("password")}
            name="password"
            label="Password"
            type="password"
          />
        </Grid>
        <Grid item>
          <Button fullWidth type="submit" variant="contained">
            Login
          </Button>
        </Grid>
        <Grid item>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            onClick={() => {
              signOut();
            }}
          >
            Signout
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
