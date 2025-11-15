import theme from "@/theme/theme";
import { Button, Stack, TextField, Typography } from "@mui/material";

import { GoDotFill } from "react-icons/go";
import { HiOutlineArrowRight } from "react-icons/hi";


const Newsletter = () => {
    return (
        <Stack width={"100%"} direction={"row"} alignItems={"start"} justifyContent={"space-between"} gap={4} mb={4} position={"relative"} overflow={"hidden"}>
            <Typography variant="h5" fontWeight={600} lineHeight={1.2} sx={{
                width: "35%",
            }}>
                Be the first to know about the news and updates about ctrl/shift 2026.
            </Typography>
            <Stack gap={2} sx={{
                backgroundColor: theme.palette.brand.napulETHRed.main,
                borderRadius: 2,
                px: 5,
                py: 3,
                minWidth: "50%",
            }}>
                <Stack direction={"row"} alignItems={"end"} gap={0.5}>
                    <Typography variant="body1" fontWeight={600} lineHeight={1.2}>
                        Email
                    </Typography>
                    <GoDotFill size={16} color={theme.palette.brand.napulETHYellow2.main} />
                </Stack>
                <Stack direction={"row"} alignItems={"center"} gap={0.5}>
                    <TextField
                        placeholder="Enter your email"
                        variant="outlined"
                        size="small"
                        sx={{
                            width: "100%",
                            minWidth: 250,
                            // target the OutlinedInput root
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#fff",
                                borderRadius: "10rem 2rem 2rem 10rem",
                                color: theme.palette.background.default,
                                fontWeight: 400,
                                // kill any focus ring/outline/box-shadow
                                outline: "none !important",
                                boxShadow: "none !important",

                                // remove the default notched outline in all states
                                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
                                "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: "none" },

                                // also ensure the element itself never shows outline
                                "&:hover, &.Mui-focused, &.Mui-active": {
                                    outline: "none",
                                    boxShadow: "none",
                                },

                                // input (the <input> element) styles
                                "& .MuiOutlinedInput-input": {
                                    fontSize: 14,
                                    fontWeight: 400,
                                    lineHeight: 1.2,
                                    padding: "10px 12px",
                                    outline: "none !important",
                                    boxShadow: "none !important",
                                    backgroundColor: "transparent", // keep root bg white
                                    "&:hover, &:focus, &:active": {
                                        outline: "none",
                                        boxShadow: "none",
                                    },
                                },
                            },
                        }}
                    />
                    <Button variant="contained" size="small" sx={{
                        background: `linear-gradient(180deg, ${theme.palette.brand.napulETHYellow2.main} 0%, rgba(227, 154, 1, 0.8) 50%, ${theme.palette.brand.napulETHYellow2.main} 100%)`,
                        color: theme.palette.background.default,
                        borderTopLeftRadius: "2rem",
                        borderBottomLeftRadius: "2rem",
                        borderTopRightRadius: "10rem",
                        borderBottomRightRadius: "10rem",
                        px: 2,
                        py: 1.5,
                        textTransform: "none",
                    }}>
                        <Stack direction={"row"} alignItems={"center"} gap={1}>
                            <Typography variant="body2" fontWeight={600} lineHeight={1.2} whiteSpace={"nowrap"}>
                                Sign Up
                            </Typography>
                            <HiOutlineArrowRight size={16} strokeWidth={2} />
                        </Stack>
                    </Button>   
                </Stack>
            </Stack>
        </Stack>
    );
};

export default Newsletter;