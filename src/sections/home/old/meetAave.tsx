import { Stack, Typography } from "@mui/material";
import MeetAaveAnimation from "@/components/home/meetAave/meetAaveAnimation";
export default function MeetAave() {
    return (
        <Stack width={"100%"} alignItems={"center"} px={2} mb={4} gap={4} position={"relative"} overflow={"hidden"}>
            <Stack width={"100%"} alignItems={"center"} gap={1}>
                <Typography variant="h3" fontWeight={700} lineHeight={1.2} sx={{
                    fontSize: "2rem !important",
                    textAlign: "center",
                }}>
                    Meet Aave
                </Typography>
                <Typography variant="h6" fontWeight={700} lineHeight={1.2} sx={{
                    opacity: 0.6,
                    textAlign: "center",
                }}>
                    Earn interest. Borrow when you need. 24/7.
                </Typography>
            </Stack>
            <MeetAaveAnimation />
        </Stack>
    );
}