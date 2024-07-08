import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import JobApplicationForm from './jobApplicationForm';
import '../Css/jobOpeningCard.css';

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
      <Card>
        <Card.Body>
          <Card.Title className="job-title">{job.title}</Card.Title>
          <Card.Text className="job-experience">Experience: {job.experience} Years</Card.Text>
          <Card.Text className="job-location">Location: {job.location}</Card.Text>
          <Card.Text className="job-salary">Salary: {job.salary}</Card.Text>
          <Button variant="primary" className="apply-button" onClick={handleApplyClick}>
            Apply
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showApplyModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Apply for {job.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <JobApplicationForm job={job} onClose={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JobOpeningCard;
