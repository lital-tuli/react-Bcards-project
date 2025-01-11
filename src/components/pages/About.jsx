import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-4">About BCard</h1>
          
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h4 mb-3">What is BCard?</h2>
              <p>
                BCard is a modern business card management platform that helps professionals 
                and businesses create, organize, and share their digital business cards. 
                Our platform streamlines the way you handle business connections in today's 
                digital world.
              </p>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h4 mb-3">Key Features</h2>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-person-plus fs-4 me-2 text-primary"></i>
                    <div>
                      <h3 className="h5">User Accounts</h3>
                      <p className="mb-0">Create a personal or business account to manage your cards.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-card-text fs-4 me-2 text-primary"></i>
                    <div>
                      <h3 className="h5">Card Management</h3>
                      <p className="mb-0">Create and manage your digital business cards easily.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-heart fs-4 me-2 text-primary"></i>
                    <div>
                      <h3 className="h5">Favorites</h3>
                      <p className="mb-0">Save and organize your favorite business contacts.</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="d-flex align-items-start">
                    <i className="bi bi-search fs-4 me-2 text-primary"></i>
                    <div>
                      <h3 className="h5">Easy Search</h3>
                      <p className="mb-0">Quickly find and access business cards.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="h4 mb-3">How It Works</h2>
              <div className="vstack gap-3">
                <div className="d-flex align-items-center">
                  <div className="badge bg-primary rounded-circle p-2 me-3">1</div>
                  <p className="mb-0">Sign up for a free account or business account</p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="badge bg-primary rounded-circle p-2 me-3">2</div>
                  <p className="mb-0">Create your digital business card with your information</p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="badge bg-primary rounded-circle p-2 me-3">3</div>
                  <p className="mb-0">Share your card and connect with other professionals</p>
                </div>
                <div className="d-flex align-items-center">
                  <div className="badge bg-primary rounded-circle p-2 me-3">4</div>
                  <p className="mb-0">Save favorite cards and manage your connections</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-3">Contact Us</h2>
              <p className="mb-3">
                Have questions or need support? We're here to help!
              </p>
              <div className="vstack gap-2">
                <div className="d-flex align-items-center">
                  <i className="bi bi-envelope me-2 text-primary"></i>
                  <span>support@bcard.com</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-telephone me-2 text-primary"></i>
                  <span>+1 (234) 567-8900</span>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-geo-alt me-2 text-primary"></i>
                  <span>123 Business Street, Tech City, 12345</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;