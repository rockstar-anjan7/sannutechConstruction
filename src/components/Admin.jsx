import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { db, auth } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ContactList from './ContactList';

const Admin = () => {
    const [authenticated, setAuthenticated] = useState(true);
    const [viewApplications, setViewApplications] = useState(false);
    const [applications, setApplications] = useState([]);
    const [showContacts, setShowContacts] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            if (!auth.currentUser) {
                setAuthenticated(false);
                navigate('/');
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setAuthenticated(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const fetchApplications = async () => {
        try {
            const applicationsCollection = collection(db, 'applications');
            const applicationsSnapshot = await getDocs(applicationsCollection);
            const applicationsList = applicationsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setApplications(applicationsList);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const handleToggleApplications = () => {
        fetchApplications(); // Explicitly call fetchApplications here
        setViewApplications(prevState => !prevState);
        setShowContacts(false); // Close contacts when toggling applications
    };

    const handleToggleContacts = () => {
        setShowContacts(prevState => !prevState);
        setViewApplications(false); // Close applications when toggling contacts
    };

    if (!authenticated) {
        return null;
    }

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Admin Page</h2>

            <Row className="mb-3">
                <Col xs={12} sm={4} className="mb-2 mb-sm-0 text-end">
                    <Button variant="danger" onClick={handleLogout} className="w-100">
                        Logout
                    </Button>
                </Col>
                <Col xs={12} sm={4} className="mb-2 mb-sm-0 text-end">
                    <Button variant="info" onClick={handleToggleApplications} className="w-100">
                        {viewApplications ? 'Hide Applications' : 'View Applications'}
                    </Button>
                </Col>
                <Col xs={12} sm={4} className="text-end">
                    <Button variant="warning" onClick={handleToggleContacts} className="w-100">
                        {showContacts ? 'Hide Contact Details' : 'View Contact Details'}
                    </Button>
                </Col>
            </Row>

            {/* Upload Service,Products and Jobs  */}
            <Row className="g-4">
                <Col xs={12} md={6} lg={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Upload Service</Card.Title>
                            <Button variant="primary" onClick={() => navigate('/upload-service')}>Upload Service</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Upload Product</Card.Title>
                            <Button variant="dark" onClick={() => navigate('/upload-product')}>Upload Product</Button>
                        </Card.Body>
                    </Card>
                </Col>

                <Col xs={12} md={6} lg={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Upload Job</Card.Title>
                            <Button variant="success" onClick={() => navigate('/upload-job')}>Upload Job</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {viewApplications && <ApplicationList applications={applications} />}
            {showContacts && <ContactList />}

        </Container>
    );
};

const ApplicationList = ({ applications }) => (
    <Container className="mt-4 mb-2">
        <h3>Job Applications</h3>
        {applications.length === 0 ? (
            <Alert variant="info">No applications found.</Alert>
        ) : (
            <ul className="list-unstyled">
                {applications.map(app => (
                    <li key={app.id} className="mb-3">
                        <Card className="p-3">
                            <Row>
                                <Col xs={12} md={6} lg={4}>
                                    <h5 className="text-success">Job Title: {app.jobTitle}</h5>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                    <strong className="text-danger">Applicant Name: {app.firstName} {app.lastName}</strong>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                    <strong>Email: {app.email}</strong>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                    <strong>Phone: {app.phone}</strong>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                    <strong>Address: {app.address}</strong>
                                </Col>
                                <Col xs={12} md={6} lg={4}>
                                    <strong>
                                        Resume:
                                        <Button variant="primary" href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="ml-1">
                                            View Resume
                                        </Button>
                                    </strong>
                                </Col>
                            </Row>
                        </Card>
                    </li>
                ))}
            </ul>
        )}
    </Container>
);

export default Admin;




// import React, { useState, useEffect } from 'react';
// import { Container, Button, Row, Col,Card } from 'react-bootstrap';
// import { db, auth } from '../firebase'; // Import Firestore, Storage, and Auth from Firebase
// import { collection, getDocs } from 'firebase/firestore';
// import { signOut } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import ContactList from './ContactList';
// const Admin = () => {
//     const [authenticated, setAuthenticated] = useState(true);
//     const [viewApplications, setViewApplications] = useState(false);
//     const [applications, setApplications] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 if (!auth.currentUser) {
//                     setAuthenticated(false);
//                     navigate('/');
//                 }
//             } catch (error) {
//                 console.error('Authentication check error:', error);
//             }
//         };

//         checkAuth();
//     }, [navigate]);

//     const handleLogout = async () => {
//         try {
//             await signOut(auth);
//             setAuthenticated(false);
//             navigate('/');
//         } catch (error) {
//             console.error("Logout error:", error);
//         }
//     };

//     const fetchApplications = async () => {
//         try {
//             const applicationsCollection = collection(db, 'applications');
//             const applicationsSnapshot = await getDocs(applicationsCollection);
//             const applicationsList = applicationsSnapshot.docs.map(doc => ({
//                 id: doc.id,
//                 ...doc.data()
//             }));
//             setApplications(applicationsList);
//         } catch (error) {
//             console.error("Error fetching applications: ", error);
//         }
//     };

//     const [showContacts, setShowContacts] = useState(false);

//     const handleToggleContacts = () => {
//         setShowContacts(!showContacts);
//     };


//     if (!authenticated) {
//         return null;
//     }

//     return (
//         <Container className="my-5">
//             <h2 className="text-center mb-4">Admin Page</h2>

//             {/* Logout Button */}
//             <Row className="mb-3">
//                 <Col className="text-end">
//                     <Button variant="danger" onClick={handleLogout}>
//                         Logout
//                     </Button>
//                 </Col>
//             </Row>

//             {/* Application Button */}
//             <Row className="mb-3">
//                 <Col className="text-end">
//                     <Button
//                         variant="info"
//                         onClick={() => {
//                             fetchApplications();
//                             setViewApplications(!viewApplications);
//                         }}
//                     >
//                         {viewApplications ? 'Hide Applications' : 'View Applications'}
//                     </Button>
//                 </Col>
//             </Row>
//             {viewApplications && <ApplicationList applications={applications} />}

//             {/* Contact Button */}
//             <Row className="mb-3">
//                 <Col className="text-end">
//                     <Button variant="warning" onClick={handleToggleContacts}>
//                         {showContacts ? 'Hide Contact Details' : 'View Contact Details'}
//                     </Button>
//                 </Col>
//             </Row>
//             {showContacts && <ContactList />}

//             <Row className="g-3">
//                 {/* Service Button */}
//                 <Col xs={12} md={6} lg={4}>
//                     <Card className="text-center">
//                         <Card.Body>
//                             <Card.Title>Upload Service</Card.Title>
//                             <Button variant="primary" onClick={() => navigate('/upload-service')}>
//                                 Upload Service
//                             </Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>

//                 {/* Product Button */}
//                 <Col xs={12} md={6} lg={4}>
//                     <Card className="text-center">
//                         <Card.Body>
//                             <Card.Title>Upload Product</Card.Title>
//                             <Button variant="dark" onClick={() => navigate('/upload-product')}>
//                                 Upload Product
//                             </Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>

//                 {/* Upload Job Button */}
//                 <Col xs={12} md={6} lg={4}>
//                     <Card className="text-center">
//                         <Card.Body>
//                             <Card.Title>Upload Job</Card.Title>
//                             <Button variant="success" onClick={() => navigate('/upload-job')}>
//                                 Upload Job
//                             </Button>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// const ApplicationList = ({ applications }) => (
//     <Container className="mt-4 mb-2">
//         <h3>Job Applications</h3>
//         {applications.length === 0 ? (
//             <p>No applications found.</p>
//         ) : (
//             <ul className="list-unstyled">
//                 {applications.map(app => (
//                     <li key={app.id} className="mb-3">
//                         <Container fluid>
//                             <Row className="border p-3 rounded">
//                                 <Col xs={12} md={6} lg={4}>
//                                     <h5 className='text-success'>Job Title: {app.jobTitle}</h5>
//                                 </Col>
//                                 <Col xs={12} md={6} lg={4}>
//                                     <strong className='text-danger'>Applicant Name: {app.firstName} {app.lastName}</strong>
//                                 </Col>
//                                 <Col xs={12} md={6} lg={4}>
//                                     <strong>Email: {app.email}</strong>
//                                 </Col>
//                                 <Col xs={12} md={6} lg={4}>
//                                     <strong>Phone: {app.phone}</strong>
//                                 </Col>
//                                 <Col xs={12} md={6} lg={4}>
//                                     <strong>Address: {app.address}</strong>
//                                 </Col>
//                                 <Col xs={12} md={6} lg={4}>
//                                     <strong>
//                                         Resume:
//                                         <Button
//                                             className='ml-1'
//                                             variant="primary"
//                                             href={app.resumeUrl}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                         >
//                                             View Resume
//                                         </Button>
//                                     </strong>
//                                 </Col>
//                             </Row>
//                         </Container>
//                     </li>
//                 ))}
//             </ul>
//         )}
//     </Container>
// );
// export default Admin;
