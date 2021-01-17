import React, { useState, useEffect, useContext } from "react";
import {
  registerUser,
  completeAuthentication,
  getProfile,
} from "../../services/ApiUserClientService";
import {
  Box,
  CircularProgress,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Flex,
  ThemeProvider,
} from "@chakra-ui/react";
import ErrorMessage from "../UI_Aids/ErrorMessage/ErrorMessage";
import customTheme from "../../theme/";
import { StateContext } from "../../global.context/globalStore.reducer";

export default function Signup() {
  async function registerNewUser({ name, surname, email, password }) {
    registerUser({ name, surname, email, password })
      .then((res) => {
        completeAuthentication(res.data);
        getProfile(res.data)
          .then((res) => dispatch({ type: "user", payload: res.data }))
          .catch((error) => setError(error.response.data));
      })
      .catch((error) => setError(error.response.data));
  }

  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const { state, dispatch } = useContext(StateContext);

  useEffect(() => {
    state.isAuth &&
      document.querySelector(".form-wrapper").classList.remove("show");
  }, [state.isAuth]);

  function submitHandle(e) {
    e.preventDefault();
    try {
      registerNewUser(userDetails);
      setIsLoading(false);
      if (!error) {
        dispatch({ type: "isAuth", payload: true });
      }
      setUserDetails({ name: "", email: "", surname: "", password: "" });
    } catch (error) {
      setIsLoading(false);
    }
  }

  const validateForm = () => {
    return (
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.name ||
      !userDetails.surname
    );
  };

  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Flex width="full" align="center" justifyContent="center" mt={10}>
          <Box>
            {error && <ErrorMessage message={error} />}
            <form onSubmit={submitHandle}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  autoFocus={false}
                  value={userDetails.name}
                  type="text"
                  placeholder="Name"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, name: e.target.value })
                  }
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Surname</FormLabel>
                <Input
                  autoFocus={false}
                  value={userDetails.surname}
                  type="text"
                  placeholder="Name"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, surname: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={3} isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  autoFocus={false}
                  value={userDetails.email}
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    setUserDetails({ ...userDetails, email: e.target.value })
                  }
                />
              </FormControl>
              <FormControl my={3} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    autoFocus={false}
                    value={userDetails.password}
                    type={show ? "text" : "password"}
                    placeholder="*******"
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      })
                    }
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShow(!show)}
                    >
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                width="full"
                mt={4}
                type="submit"
                colorScheme="primary"
                variant="outline"
                boxShadow="sm"
                disabled={validateForm()}
                _hover={{ boxShadow: "md" }}
                _active={{ boxShadow: "lg" }}
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  "Register"
                )}
              </Button>
            </form>
          </Box>
        </Flex>
      </ThemeProvider>
    </>
  );
}
