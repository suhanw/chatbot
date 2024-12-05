import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import DialogContent from "@mui/material/DialogContent";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function AuthDialog() {
  const theme = useTheme();
  const [loginView, setLoginView] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Dialog open fullWidth maxWidth="xs">
      <SmartToyIcon
        fontSize="large"
        sx={{
          width: "50px",
          height: "50px",
          margin: "30px auto 0px",
          padding: "10px",
          borderRadius: "50%",
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      />
      {loginView ? (
        <DialogTitle textAlign="center">Welcome back</DialogTitle>
      ) : (
        <DialogTitle textAlign="center">Create an account</DialogTitle>
      )}

      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          label="Email"
          variant="outlined"
          required
          sx={{ marginTop: "10px" }}
        />
        <FormControl variant="outlined" required sx={{ marginTop: "10px" }}>
          <InputLabel htmlFor="password" sx={{ background: "#fff" }}>
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant="contained" size="large" sx={{ marginTop: "10px" }}>
          Continue
        </Button>

        <FormHelperText
          sx={{
            marginTop: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            "& .MuiButton-root": {
              margin: 0,
              padding: 0,
              fontSize: "inherit",
              textTransform: "none",
            },
          }}
        >
          {loginView ? (
            <>
              <div>Don't have an account?</div>
              <Button onClick={() => setLoginView(false)} variant="text">
                Sign up
              </Button>
            </>
          ) : (
            <>
              <div>Already have an account?</div>
              <Button onClick={() => setLoginView(true)} variant="text">
                Log in
              </Button>
            </>
          )}
        </FormHelperText>
      </DialogContent>
    </Dialog>
  );
}

export default AuthDialog;
