// import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import './glowing-hexagon.scss';

// export const GlowingHexagon = () => {
//   return (
//     <Container fluid className="glow-hexagon-container">
//       <Row>
//         {[...Array(12)].map((_, i) => (
          
//           <Col key={i} xs={4} sm={4} md={4} lg={4} className="hexagon-col"> 
//             <div className="hexagon">
//               <div className="hexagon-inner"></div>
//             </div>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

import React from 'react';
import './glowing-hexagon.scss';

export const GlowingHexagon = () => {
  return (
    <div className="glow-hexagon-container">
      <div className="hexagon-grid">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="hexagon">
            <div className="hexagon-inner"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

