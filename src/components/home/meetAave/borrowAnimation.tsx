import { Stack } from "@mui/material";

export default function BorrowAnimation() {
    return (
        <Stack width={"100%"} minHeight={500} alignItems={"stretch"} sx={{
            backgroundColor: "#F7F6F6",
            borderRadius: 2,
            position: "relative",
        }}>
            <Stack width={"100%"} height={"50%"} position={"absolute"} sx={{
                backgroundColor: "#FCFCFB",
                top: 0,
                left: 0,
                right: 0,
                borderTopLeftRadius: 2,
                borderTopRightRadius: 2,
                zIndex: 2,
            }} />
        </Stack>
    );
}