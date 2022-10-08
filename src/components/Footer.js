import React from "react";
import {
  Box
} from "../FooterStyles";

const Footer = () => {
  return (
    <Box style={{ position: "static", backgroundColor: '#272727'}}>
      <h4
        style={{
          color: "white",
          textAlign: "center",
          
        }}
      >
        Design By Chí Nguyên
      </h4>
      <h4
        style={{
          color: "white",
          textAlign: "center",
          marginTop: '4px'
        }}
      >
        Nhóm 2
      </h4>
    </Box>
  );
};
export default Footer;
