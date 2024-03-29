import React from "react";
import covid1 from "../assets/images/covid1.gif";
import styled from "styled-components";

function Info() {
  return (
    <InfoWrapper>
      <div className="app-info" id="avoidcovid">
        <h3 className="title2">AVOID COVID</h3>
        <img className="covid1" src={covid1} alt="" />
        <p className="info">
          Improving ventilation (moving air into, out of, or within a room) and
          filtration (trapping particles on a filter to remove them from the
          air) can help prevent virus particles from accumulating in indoor air.
          Improving ventilation and filtration can help protect you from getting
          infected with and spreading the virus that causes COVID-19. Spending
          time outside when possible instead of inside can also help: Viral
          particles spread between people more readily indoors than outdoors.
        </p>
        <a
          className="link"
          href="https://www.usa.gov/coronavirus"
          target={"blank"}
        >
          {" "}
          Learn about the types of assistance the federal government offers
          people and business affected by the COVID-19 pandemic.{" "}
        </a>
      </div>
    </InfoWrapper>
  );
}

export default Info;

const InfoWrapper = styled.div`
  .link {
    display: flex;
    justify-content: center;
    text-decoration: none;
    font-size: 0.7rem;
    font-family: "Montserrat";
    letter-spacing: 2px;
    color: #96e6c1;
    margin-top: 16rem;
    margin-right: 1.6rem;
    margin-left: 1rem;
  }

  .link:hover {
    color: rgba(247, 205, 150, 0.685);
  }

  .app-info {
    margin-top: 27rem;
    text-align: center;
  }

  .title2 {
    display: inline-block;
    margin-top: 9rem;
    margin-right: 1.2rem;
    margin-left: 1.2rem;
    font-size: 2.2rem;
    letter-spacing: 5px;
    font-family: "Montserrat";
    color: rgb(219, 164, 92);
  }

  .covid1 {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-right: 6rem;
    margin-left: 1rem;
    margin-top: -16rem;
    width: 85%;
    padding-top: 24rem;
  }

  .info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: left;
    margin-top: -32.5rem;
    margin-left: 2.5rem;
    margin-right: 2.5rem;
    font-size: 0.8rem;
    font-family: "Montserrat";
    line-height: 1.2rem;
    color: antiquewhite;
  }

  @media only screen and (min-width: 320px) and (max-width: 375px) {
    .link {
      font-size: 0.6rem;
      letter-spacing: 1px;
    }

    .title2 {
      font-size: 2.2rem;
    }

    .covid1 {
      margin-right: 1rem;
      margin-left: 1rem;
      width: 85%;
      padding-top: 29.5rem;
    }

    .info {
      margin-top: -31.5rem;
      margin-left: 2.5rem;
      margin-right: 2.5rem;
    }
  }

  @media only screen and (min-width: 390px) and (max-width: 480px) {
    .link {
      margin-right: 1.5rem;
      margin-left: 1rem;
    }

    .covid1 {
      margin-right: 1rem;
      margin-left: 1rem;
      width: 85%;
      padding-top: 29.5rem;
    }

    .info {
      margin-top: -33rem;
      margin-left: 3rem;
      margin-right: 3rem;
    }
  }

  @media only screen and (min-width: 768px) {
    .link {
      font-size: 0.8rem;
      letter-spacing: 2px;
      margin-top: 27rem;
      margin-right: 6.5rem;
      margin-left: 4.5rem;
    }

    .app-info {
      margin-top: 35rem;
    }

    .title2 {
      font-size: 3rem;
      margin-left: 1.2rem;
      margin-right: 1.2rem;
    }

    .covid1 {
      margin-right: 1rem;
      margin-left: 1rem;
      padding-top: 28rem;
    }

    .info {
      text-align: center;
      margin-top: -50.5rem;
      margin-left: 6.5rem;
      margin-right: 6.5rem;
      font-size: 1.2rem;
      line-height: 1.9rem;
    }
  }

  @media only screen and (min-width: 1024px) {
    .link {
      letter-spacing: 2px;
      margin-top: 10rem;
    }

    .app-info {
      margin-top: 10rem;
    }

    .title2 {
      display: flex;
      justify-content: flex-end;
      margin-top: 9rem;
      margin-right: 3rem;
      font-size: 4rem;
      letter-spacing: 5px;
    }

    .covid1 {
      margin-top: -32.5rem;
      margin-left: -5rem;
      width: 50%;
    }

    .info {
      text-align: right;
      margin-top: -25.5rem;
      margin-left: 24rem;
      margin-right: 3rem;
      font-size: 1rem;
      line-height: 1.5rem;
      color: antiquewhite;
    }
  }

  @media only screen and (min-width: 1366px) {
    .link {
      font-size: 0.8rem;
      margin-top: 16rem;
    }

    .app-info {
      margin-top: 13rem;
    }

    .title2 {
      margin-top: 9rem;
      margin-right: 3rem;
      font-size: 4.5rem;
      letter-spacing: 5px;
    }

    .covid1 {
      margin-top: -35.5rem;
      margin-left: -5rem;
      width: 53%;
    }

    .info {
      margin-top: -35.5rem;
      margin-left: 38rem;
      margin-right: 3rem;
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;
