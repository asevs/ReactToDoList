import React, { useRef, useEffect } from 'react';
import './style.css';
import { ReactComponent as Scene } from '../../buildingscene.svg';
import gsap from 'gsap';

function Home() {
  const wrapper = useRef(null);

  useEffect(() => {
    const [elements] = wrapper.current.children;

    const sun = elements.getElementById('sun');
    const building1 = elements.getElementById('building1');
    const building2 = elements.getElementById('building2');
    const building3 = elements.getElementById('building3');
    gsap.set([sun, building1, building2, building3], { autoAlpha: 0 });
    gsap.set(building1, { transformOrigin: '50% 100%' });
    gsap.set(building2, { transformOrigin: '50% 100%' });
    gsap.set(building3, { transformOrigin: '50% 100%' });
    gsap.set(sun, { transformOrigin: '50% 50%' });



    const timeline = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

    timeline
      .fromTo(sun, { y: '+=300' }, { duration: 1, y: '-=300', autoAlpha: 1}, '-=0.5')
      .fromTo(building1, { y: '+=300' }, { duration: 1, y: '-=300', autoAlpha: 1})
      .fromTo(building2, { y: '+=300' }, { duration: 1, y: '-=300', autoAlpha: 1})
      .fromTo(building3, { y: '+=300' }, { duration: 1, y: '-=300', autoAlpha: 1})


  });

  return (
    <div ref={wrapper} className="Scene">
      <Scene />
    </div>
  );
}

export default Home;
