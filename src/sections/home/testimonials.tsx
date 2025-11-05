import theme from "@/theme/theme";
import { Stack, Typography } from "@mui/material";
import TestimonialsCarousel from "@/components/home/testimonials/testimonialsCarousel";

const Testimonials = () => {
    return (
        <Stack width={"100%"} className="max-w-7xl mx-auto" px={16} mb={4} gap={4} position={"relative"} overflow={"hidden"}>
            <Typography variant="h3" fontWeight={700} lineHeight={1.2} sx={{
                width: "90%",
                fontSize: "2.5rem !important",
            }}>
                Trusted by the best. <span style={{ color: theme.palette.secondary.main }} >Aave is used by leading institutions and companies.</span>
            </Typography>
            <TestimonialsCarousel />
        </Stack>
    );
};

export default Testimonials;