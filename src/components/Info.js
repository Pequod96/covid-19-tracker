import React from 'react';
import covid1 from '../assets/images/covid1.gif';
import '../components/Info.css';

function Info() {
  return (
    <div className='app-info' id='avoidcovid'>
      <h3 className='title2'>AVOID COVID</h3>
      <img className="covid1" src={covid1} alt=''/>
      <p className='info'>Improving ventilation (moving air into, out of, or within a room) and filtration
      (trapping particles on a filter to remove them from the air) can help prevent virus particles
      from accumulating in indoor air. Improving ventilation and filtration can help protect you from getting
      infected with and spreading the virus that causes COVID-19. Spending time outside when possible instead
      of inside can also help: Viral particles spread between people more readily indoors than outdoors.</p>
      <a className='link' href='https://www.usa.gov/coronavirus' target={'blank'}> Learn about the types of assistance the federal government
      offers people and business affected by the COVID-19 pandemic. </a>
    </div>
  )
}

export default Info;
