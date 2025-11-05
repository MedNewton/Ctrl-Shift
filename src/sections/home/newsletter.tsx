import theme from "@/theme/theme";
import { Button, Stack, TextField, Typography } from "@mui/material";

import { GoDotFill } from "react-icons/go";
import { HiOutlineArrowRight } from "react-icons/hi";


const Newsletter = () => {
    return (
        <Stack width={"100%"} direction={"row"} alignItems={"center"} justifyContent={"space-between"} gap={4} className="max-w-7xl mx-auto" mb={4} px={20} position={"relative"} overflow={"hidden"}>
            <Typography variant="h5" fontWeight={600} lineHeight={1.2} sx={{
                width: "35%",
            }}>
                Be the first to hear Aave ecosystem news.
            </Typography>
            <Stack gap={2} sx={{
                backgroundColor: theme.palette.brand.napulETHGrey1.main,
                borderRadius: 2,
                p: 5,
                minWidth: "50%",
            }}>
                <Stack direction={"row"} alignItems={"end"} gap={0.5}>
                    <Typography variant="body1" fontWeight={600} lineHeight={1.2} sx={{
                        opacity: 0.7,
                    }}>
                        Email
                    </Typography>
                    <GoDotFill size={16} color={theme.palette.brand.napulETHPurple1.main} />
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
                                color: theme.palette.text.primary,
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
                        backgroundColor: theme.palette.text.primary,
                        color: theme.palette.background.default,
                        borderTopLeftRadius: "2rem",
                        borderBottomLeftRadius: "2rem",
                        borderTopRightRadius: "10rem",
                        borderBottomRightRadius: "10rem",
                        px: 2,
                        py: 1.25,
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