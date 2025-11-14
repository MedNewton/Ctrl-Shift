import theme from "@/theme/theme";
import { Stack, Typography } from "@mui/material";

const Topics = () => {
  return (
    <Stack width="100%" height="100vh" sx={{ backgroundColor: "red" }}>
      <Typography variant="h1" color={theme.palette.primary.main} fontWeight={600}>Topics</Typography>
    </Stack>
  );
};

export default Topics;