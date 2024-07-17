import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import '../Css/jobOpeningCard.css'; // Custom CSS for styling
import SkilledJobApplicationForm from './SkilledJobApplicationForm';
import NonSkilledJobApplicationForm from './NonSkilledJobApplicationForm'; // Import Non-skilled Form

const JobOpeningCard = ({ job }) => {
  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleApplyClick = () => {
    setShowApplyModal(true);
  };

  const handleCloseModal = () => {
    setShowApplyModal(false);
  };

  return (
    <div className="job-opening-card">
      <Card className="job-card">
        {job.imageUrl && <Card.Img variant="top" src={job.imageUrl} alt={job.title} className="job-image" />}
        <Card.Body>
          <Card.Title className="job-title">{job.title}</Card.Title>
          <h5 className="job-experience">Experience: {job.experience} Years</h5>
          <h5 className="job-location">Location: {job.location}</h5>
          <h5 className="job-salary">Salary: {job.salary}</h5>
          <Button variant="primary" className="apply-button" onClick={handleApplyClick}>
            Apply
          </Button>
        </Card.Body>
      </Card>

      {/* Apply Modal */}
      <Modal show={showApplyModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {job.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Render SkilledJobApplicationForm for skilled jobs, else render NonSkilledJobApplicationForm */}
          {job.skillLevel === 'professional' ? (
            <SkilledJobApplicationForm job={job} onClose={handleCloseModal} />
          ) : (
            <NonSkilledJobApplicationForm job={job} onClose={handleCloseModal} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobOpeningCard;


// import React, { useState } from 'react';
// import { Card, Button, Modal } from 'react-bootstrap';
// import '../Css/jobOpeningCard.css'; // Custom CSS for styling
// import SkilledJobApplicationForm from './SkilledJobApplicationForm';
// import NonSkilledJobApplicationForm from './NonSkilledJobApplicationForm'; // Import Non-skilled Form

// const JobOpeningCard = ({ job }) => {
//   const [showApplyModal, setShowApplyModal] = useState(false);

//   const handleApplyClick = () => {
//     setShowApplyModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowApplyModal(false);
//   };

//   return (
//     <div className="job-opening-card">
//       <Card className="job-card">
//         <Card.Body>
//           <Card.Title className="job-title">{job.title}</Card.Title>
//           <Card.Text className="job-experience">Experience: {job.experience} Years</Card.Text>
//           <Card.Text className="job-location">Location: {job.location}</Card.Text>
//           <Card.Text className="job-salary">Salary: {job.salary}</Card.Text>
//           <Button variant="primary" className="apply-button" onClick={handleApplyClick}>
//             Apply
//           </Button>
//         </Card.Body>
//       </Card>

//       {/* Apply Modal */}
//       <Modal show={showApplyModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Apply for {job.title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {/* Render SkilledJobApplicationForm for skilled jobs, else render NonSkilledJobApplicationForm */}
//           {job.skillLevel === 'skilled' ? (
//             <SkilledJobApplicationForm job={job} onClose={handleCloseModal} />
//           ) : (
//             <NonSkilledJobApplicationForm job={job} onClose={handleCloseModal} />
//           )}
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// };

// export default JobOpeningCard;
