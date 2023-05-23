import {
  Button,
  Container,
  Flex,
  Input,
  MantineProvider,
  Space,
} from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

const MantineSearchBar = () => {
  return (
    <>
      <MantineProvider
        theme={{
          components: {
            Input: {
              styles: () => ({
                input: {
                  borderColor: "#00c2ff",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  "&:focus-within": {
                    borderColor: "#29cc97",
                  },
                },
              }),
            },
          },
        }}
      >
        <Input
          icon={<IconSearch size={25} color="#00c2ff" />}
          placeholder="Search Appointments"
          radius="xl"
        />
      </MantineProvider>
    </>
  );
};

export default MantineSearchBar;
