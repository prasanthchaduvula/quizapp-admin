import React from 'react';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      admin: ''
    };
  }
  componentDidMount() {
    fetch('http://localhost:3001/api/v1/admin', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.quizAdminToken
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({ admin: data.admin });
        }
        console.log(this.state.admin);
      });
  }
  render() {
    let { admin } = this.state;
    return (
      <div className="profile-section">
        <center>
          <img className="profile-pic" src={admin.adminPicture} alt="" />
          <p className="profile-name">{admin.adminName}</p>
        </center>
      </div>
    );
  }
}

export default Profile;
