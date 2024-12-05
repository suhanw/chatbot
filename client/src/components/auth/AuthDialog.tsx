import { SyntheticEvent, useEffect, useState } from "react";
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
import Box from "@mui/material/Box";

import { useGetCurrentUser, useLogin, useSignup } from "../../store/auth";

function AuthDialog() {
  const { isLoggedIn } = useGetCurrentUser();
  const [loginView, setLoginView] = useState(true);

  if (isLoggedIn) return null;
  return (
    <Dialog open fullWidth maxWidth="xs">
      <AuthDialogHeader loginView={loginView} />
      <DialogContent>
        <AuthDialogForm loginView={loginView} />
        <AuthDialogSwitcher loginView={loginView} setLoginView={setLoginView} />
      </DialogContent>
    </Dialog>
  );
}

function AuthDialogHeader({ loginView }: { loginView: boolean }) {
  const theme = useTheme();
  return (
    <>
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
    </>
  );
}

function AuthDialogSwitcher({
  loginView,
  setLoginView,
}: {
  loginView: boolean;
  setLoginView: (loginView: boolean) => void;
}) {
  return (
    <Box
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
          <span>Don't have an account?</span>
          <Button onClick={() => setLoginView(false)} variant="text">
            Sign up
          </Button>
        </>
      ) : (
        <>
          <span>Already have an account?</span>
          <Button onClick={() => setLoginView(true)} variant="text">
            Log in
          </Button>
        </>
      )}
    </Box>
  );
}

function PasswordField({
  label = "Password",
  password,
  setPassword,
}: {
  label?: string;
  password: string;
  setPassword: (password: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl variant="outlined" required sx={{ marginTop: "10px" }}>
      <InputLabel htmlFor={label} sx={{ background: "#fff" }}>
        {label}
      </InputLabel>
      <OutlinedInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        id={label}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label={
                showPassword ? "hide the password" : "display the password"
              }
              onClick={() => setShowPassword((show) => !show)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

function AuthDialogForm({ loginView }: { loginView: boolean }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const { login, error: loginError, clearLoginError } = useLogin();
  const { signup, error: signupError, clearSignupError } = useSignup();

  const error = loginError || signupError || passwordValidationError;

  const clearError = () => {
    setPasswordValidationError("");
    clearLoginError();
    clearSignupError();
  };

  const isValidPassword = () => {
    if (password.length < 8) {
      setPasswordValidationError(
        "Password must be at least 8 characters long."
      );
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordValidationError("Passwords do not match.");
      return false;
    }
    return true;
  };

  const handleContinue = (e: SyntheticEvent) => {
    e.preventDefault();
    clearError();
    if (loginView) {
      login(email, password);
    } else if (isValidPassword()) {
      signup(email, password);
    }
  };

  useEffect(() => {
    clearError();
  }, [loginView]);

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleContinue}
    >
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label="Email"
        variant="outlined"
        required
        type="email"
        sx={{ marginTop: "10px" }}
      />

      <PasswordField password={password} setPassword={setPassword} />

      {!loginView && (
        <PasswordField
          label="Confirm password"
          password={confirmPassword}
          setPassword={setConfirmPassword}
        />
      )}

      <FormHelperText error={!!error} sx={{ textAlign: "center" }}>
        {error}
      </FormHelperText>

      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: "10px" }}
        type="submit"
      >
        Continue
      </Button>
    </form>
  );
}

export default AuthDialog;
