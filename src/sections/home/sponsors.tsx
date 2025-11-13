import { Box, Grid, Stack, Typography } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";


const Sponsors = () => {
  return (
    <Stack width={"100%"} minHeight={"100dvh"} sx={{
      backgroundColor: theme.palette.brand.napulETHRed.main,
      px: 8,
      py: 4,
    }}>
      <Typography variant="h1" color={theme.palette.primary.main} fontWeight={600}>Sponsors</Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Box width="100%" sx={{
            aspectRatio: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Sponsors;