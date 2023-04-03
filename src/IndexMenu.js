import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import Box from "@mui/material/Box";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const IndexMenu = ({ items }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  useEffect(() => {
    setIsVisible(trigger);
    if (trigger) {
      const maxScroll = 100; // Cambie este valor para ajustar la cantidad de desplazamiento requerido para la opacidad máxima
      const currentScroll = window.pageYOffset;
      setOpacity(Math.min(currentScroll / maxScroll, 1));
    } else {
      setOpacity(0);
    }
  }, [trigger]);

  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        top: "50%",
        transform: "translateY(-50%)",
        padding: 1,
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 1,
        display: isVisible ? "block" : "none",
      }}
    >
      <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
        {items.map((item) => (
          <li key={item.id}>
            <div
              style={{
                opacity: opacity,
                transition: "opacity 0.3s",
              }}
            >
              <Link
                activeClass="active"
                to={`item-${item.id}`}
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                style={{
                  textDecoration: "underline",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default IndexMenu;
