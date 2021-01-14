import React, { useContext } from "react";
import { Button, Flex, Box, Grid, Heading } from "@chakra-ui/react";
import moment from "moment";
import { StateContext } from "../../global.context/globalStore.reducer";

export default function TopisCGrid({ topics }) {
  const { state } = useContext(StateContext);

  return (
    <>
      <Grid
        templateRows="repeat(5, 1fr)"
        gap={6}
        mt="20px"
        mx="30px"
        px="30px"
        justifyContent="center"
      >
        {topics &&
          topics.map((topic) => (
            <Flex
              w="40vw"
              boxShadow="0 0 10px #3333"
              py="40px"
              px="20px"
              key={topic._id}
              borderRadius="lg"
            >
              <Flex flex="6" flexDir="column">
                <Box>
                  <Heading size="md">{topic.title}</Heading>
                </Box>
                <Flex my={3}>
                  <Box pr={3}>
                    <code>{topic.author}</code>
                  </Box>
                  <Box pl={2} fontStyle="italic">
                    {moment(topic.date).format("MMMM Do YYYY")}
                  </Box>
                </Flex>
                <Box>{topic.content}</Box>
              </Flex>
              <Flex flexDir="column-reverse">
                {state.isAuth && (
                  <Button colorScheme="primary" size="sm" w="100px">
                    Reply
                  </Button>
                )}
              </Flex>
            </Flex>
          ))}
      </Grid>
    </>
  );
}
