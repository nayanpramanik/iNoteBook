import React from 'react';
import styled from 'styled-components';
import member1 from '../utils/member1.jpg';  // Replace with the correct paths to the images
import member2 from '../utils/member2.jpg';
import member3 from '../utils/member3.jpg';
import member4 from '../utils/member4.jpg';
import member5 from '../utils/member5.jpg';

const teamMembers = [
    { name: 'Priyam Kumar Yaduka', image: member1 },
    { name: 'Hitesh Kumar Mahto', image: member2 },
    { name: 'Nayan Kumar Pramanik', image: member3 },
    { name: 'Dhansiri Sinhababu', image: member4 },
    { name: 'Apurva Kumar', image: member5 },
];

const AboutContainer = styled.div`
    margin-top: -8vh;
    padding: 0 2rem;
`;

const HeaderSection = styled.div`
    height: 10vh;
    padding: 2rem 0;
`;

const TeamSection = styled.div`
    margin-top: 2rem;

    h3 {
        margin-bottom: 2rem;
    }
`;

const TeamGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
`;

const TeamMemberCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    img {
        width: 100%;
        height: auto;
        border-radius: 50%;
        margin-bottom: 1rem;
    }

    h5 {
        font-size: 1.2rem;
        font-weight: 600;
        color: #333;
    }
`;

const FooterSection = styled.footer`
    height: 8vh;
    background-color: rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3rem;
    padding-top: 1rem;
`;

const About = () => {
    return (
        <AboutContainer className="text-center">
            <HeaderSection className="d-flex justify-content-start align-items-center">
                {/* <h3 className="source-code-header">Source Code <a href="https://github.com/Dolly-chauhan12/iNotes" target="_blank" rel="noreferrer"><i className="fa-brands fa-square-github"></i></a></h3> */}
                {/* <a href="https://drive.google.com/file/d/1E8lJi5DVDg07Gbejc9LbQz8tiBl_jpk5/view?usp=share_link" className="btn btn-dark active mx-2 mb-1" role="button" aria-pressed="true" target="_blank" rel="noreferrer">Video Demo</a> */}
            </HeaderSection>

            <TeamSection>
                <h3>Our Team</h3>
                <TeamGrid>
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={index}>
                            <img src={member.image} alt={member.name} />
                            <h5>{member.name}</h5>
                        </TeamMemberCard>
                    ))}
                </TeamGrid>
            </TeamSection>

            <FooterSection>
                © 2023 Copyright - Apurva Kumar
            </FooterSection>
        </AboutContainer>
    );
};

export default About;
