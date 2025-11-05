import { Stack } from "@mui/material";

import Hero1 from "@/sections/home/hero1";

export default function Home() {

  return (
    <Stack width={"100%"} alignItems={"center"} gap={10}>
      <Stack width={"100%"} className="max-w-7xl mx-auto px-10" borderRadius={4} overflow={"hidden"}>
        <Hero1 borderRadius={4} backgroundColor="#952527" />
      </Stack>
    </Stack>
  );
}
