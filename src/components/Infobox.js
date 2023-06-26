import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styled from "styled-components";

const Infobox = ({ title, cases, isGreen, total }) => {
  return (
    <InfoBoxWrapper>
      <Card className={`infobox-cases ${"infobox-cases"}`}>
        <CardContent>
          <Typography className="infobox-title" color="white" fontFamily="Montserrat">
            {title}
          </Typography>
          <h2 className={`infobox-cases ${isGreen && "infobox-cases--green"}`}>
            {cases}
          </h2>
          <Typography className="infobox-total" color="white" fontFamily="Montserrat">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </InfoBoxWrapper>
  );
};

export default Infobox;


const InfoBoxWrapper = styled.div`
border: 3px solid rgb(247, 205, 150);
margin-top: 1rem;
border-radius: 1rem;
  .infobox-cases {
    font-family: 'Montserrat';
    background-color: black;
    width: 22.5rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: 3rem;
    margin-left: 3rem;
  }

  .infobox-cases--green {
    color: darkgreen !important;
  }

  .infobox-cases {
    color: #cc1034;
    font-weight: 400;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  @media only screen and (min-width: 320px) and (max-width: 375px) {
    .infobox-cases {
      width: 15.5rem;
    }

    .infobox-cases {
      font-weight: 600;
      font-size: 1.3rem;

    }
  }

  @media only screen and (min-width: 390px) and (max-width: 480px) {
    .infobox-cases {
      width: 15.5rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }

    .infobox-cases {
      font-size: 1.2rem;
    }
  }

  @media only screen and (min-width: 768px) {
    margin-top: 1rem;
    .infobox-cases {
      width: 43rem;
      margin-left: 1rem;
      margin-right: 1rem;
    }

    .infobox-cases {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
  }

  @media only screen and (min-width: 1024px) {
    .infobox-cases {
      width: 15rem;
    }

    .infobox-cases {
      font-size: 1.75rem;
    }
  }

  @media only screen and (min-width: 1366px) {
    .infobox-cases {
      width: 20rem;
    }

    .infobox-cases {
      font-weight: 400;
      font-size: 1.75rem;
    
    }
  }
`;
