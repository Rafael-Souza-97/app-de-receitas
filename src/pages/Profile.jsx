import React from 'react';
import Header from '../components/Header';
import ProfileButtons from '../components/ProfileButtons';
import Footer from '../components/Footer';

function Profile() {
  return (
    <div className="container-fluid">
      <Header title="Profile" />
      <ProfileButtons />
      <Footer />
    </div>
  );
}

export default Profile;
