import React from 'react';
import styled from 'styled-components';


const FooterContainer = styled.footer`
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1rem;
    position: relative;
    bottom: 0;
    width: 100%;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <p>
                <strong>Catatan App</strong> Taufika Retno Wulan - 123220196
            </p>
        </FooterContainer>
    );
};

export default Footer;