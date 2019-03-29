import React, { Component } from 'react';
import styled from 'styled-components';

const PageTitle = styled.h2`
  padding: .9rem 1.5rem;
`

const RankingWrapper = styled.div`
  padding: .9rem 1.5rem;
  display: flex;
  align-items: center;
  background: white;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.1);
`
const RankingIndex = styled.div`
  font-weight: bold;
  margin-right: 1.5rem;
  width: 2rem;
  text-align: center;
`

const RankingImage = styled.img`
  margin-right: 1rem;
  border-radius: 50%;
  height: 40px;
  width: 40px;
`

const RankingName = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  width: 100%;
`

const RankingPoints = styled.div`
  white-space: nowrap;
  font-size: 1.25rem;
`

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employees: []
    };

    this.loadCustomers(1)
      .then((data) => {
        this.setState({
          employees: data
        });
      });
  }

  loadCustomers = (shopId) => {
    return fetch(`https://rmarket-backend.herokuapp.com/employees/${shopId}`)
      .then(res => res.json())
  }

  render() {
    const { employees } = this.state;

    return (
      <div className="Dashboard">
        <PageTitle>Worker rankings</PageTitle>
        {employees.map((e, i) => (
          <RankingWrapper key={e.idx}>
            <RankingIndex>{i + 1}</RankingIndex>
            <RankingImage src={e.icon} />
            <RankingName>{e.firstName} {e.lastName}</RankingName>
            <RankingPoints>{e.points}</RankingPoints>
          </RankingWrapper>
        ))}
      </div>
    );
  }
}

export default Dashboard;