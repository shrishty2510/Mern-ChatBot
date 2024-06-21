import React,{useState} from "react";
import { Button } from "@chakra-ui/react";

const ShowHide = ({ key, show,handleClick}) => {
  return (
    <Button h="2rem" size="sm" onClick={handleClick} key={key}>
      {show ? "Hide" : "Show"}
    </Button>
  );
};

export default ShowHide;
