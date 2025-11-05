import { Stack, Typography, Grid } from "@mui/material";
import theme from "@/theme/theme";
import Image from "next/image";

import earnAsset from "@/assets/images/hero/1.webp"
import swapAsset from "@/assets/images/hero/2.webp"
import saveAsset from "@/assets/images/hero/3.webp"
import healthAsset from "@/assets/images/hero/4.webp"

export default function YourMoney() {
    return (
        <Stack width={"100%"} className="max-w-7xl mx-auto" alignItems={"center"} px={16} mb={4} gap={4} position={"relative"} overflow={"hidden"}>
            <Stack width={"100%"} gap={1}>
                <Typography variant="h3" fontWeight={700} sx={{ fontSize: "2.5rem !important" }}>
                    Your money, your choice.
                </Typography>
            </Stack>
            <Grid container spacing={8}>
                <Grid size={6}>
                    <Stack width={"100%"} justifyContent={"end"} minHeight={260} sx={{
                        backgroundColor: "#FCFCFC",
                        borderRadius: 2,
                        position: "relative",
                        overflow: "hidden",
                        p: 2,
                    }}>
                        <Image src={earnAsset} alt="Earn" width={200} height={200} style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            scale: 2
                        }} />
                        <Stack>
                            <Typography variant="h5" fontWeight={700}>
                                Earn
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={500} color={theme.palette.secondary.main}>
                                Earn interest lending out assets.
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid size={6}>
                    <Stack width={"100%"} justifyContent={"end"} minHeight={260} sx={{
                        backgroundColor: "#FCFCFC",
                        borderRadius: 2,
                        position: "relative",
                        overflow: "hidden",
                        p: 2,
                    }}>
                        <Image src={swapAsset} alt="Swap" width={200} height={200} style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            scale: 2
                        }} />
                        <Stack>
                            <Typography variant="h5" fontWeight={700}>
                                Earn
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={500} color={theme.palette.secondary.main}>
                                Earn interest lending out assets.
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid size={6}>
                    <Stack width={"100%"} justifyContent={"end"} minHeight={260} sx={{
                        backgroundColor: "#FCFCFC",
                        borderRadius: 2,
                        position: "relative",
                        overflow: "hidden",
                        p: 2,
                    }}>
                        <Image src={saveAsset} alt="Save" width={200} height={200} style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            scale: 2
                        }} />
                        <Stack>
                            <Typography variant="h5" fontWeight={700}>
                                Earn
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={500} color={theme.palette.secondary.main}>
                                Earn interest lending out assets.
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid size={6}>
                    <Stack width={"100%"} justifyContent={"end"} minHeight={260} sx={{
                        backgroundColor: "#FCFCFC",
                        borderRadius: 2,
                        position: "relative",
                        overflow: "hidden",
                        p: 2,
                    }}>
                        <Image src={healthAsset} alt="Health" width={200} height={200} style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            scale: 2
                        }} />
                        <Stack>
                            <Typography variant="h5" fontWeight={700}>
                                Earn
                            </Typography>
                            <Typography variant="subtitle1" fontWeight={500} color={theme.palette.secondary.main}>
                                Earn interest lending out assets.
                            </Typography>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
}