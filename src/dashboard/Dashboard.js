import React, { Component } from 'react';
import styled from 'styled-components';
import openSocket from 'socket.io-client';
import FlipMove from 'react-flip-move';
import EventFlow from './../common/EventFlow';
import Bodium from './../common/Bodium';
import NavigationBar from "../navigation/NavigationBar";
let socket;

// TODO: Move to env variable
const RMARKET_API_URL = 'https://rmarket-backend.herokuapp.com';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      events: []
    };
  }

  componentDidMount() {
    const { match: { params }, history } = this.props;

    socket = openSocket(`${RMARKET_API_URL}/${params.guid}`);

    fetch(`${RMARKET_API_URL}/stores/${params.guid}/employees`)
      .then(res => {
        if (!res.ok) {
          history.push('/');
          return;
        }

        return res.json();
      })
      .then((data) => {
        this.setState({
          employees: data
        });

        this.initSocketListeners();
      });
  }

  initSocketListeners = () => {
    socket.on('refresh', (data) => {
      console.log(data);

      const d = this.state.employees.map(e => {
        if (e.idx === data.employee.idx) {
          return { ...e, points: data.points };
        } else {
          return e;
        }
      });

      const events = this.state.events.concat(data)

      this.setState({
        employees: d.sort((e1, e2) => e2.points - e1.points),
        events: events.sort((e1, e2) => new Date(e2.dateTime) - new Date(e1.dateTime)),
      });
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  render() {
    const { employees, events } = this.state;
    const [first, second, third, ...restOfTheEmployees] = employees;

    return (
      <ViewWrapper>
        <NavigationBar user={this.props.user}/>
        <DashboardWrapper>
          <ViewContentWrapper>
            <ViewContent>
              <Bodium first={first} second={second} third={third} />
              <FlipMove>
                {restOfTheEmployees.map((e, i) => (
                  <RankingWrapper key={e.idx}>
                    <RankingIndex>{i + 4}</RankingIndex>
                    <RankingImage icon={e.icon} />
                    <RankingName>{e.firstName} {e.lastName}</RankingName>
                    <RankingPoints>{e.points}</RankingPoints>
                  </RankingWrapper>
                ))}
              </FlipMove>
            </ViewContent>
          </ViewContentWrapper>
          <Sidebar>
            <EventFlow events={events} />
          </Sidebar>
        </DashboardWrapper>
      </ViewWrapper>
    );
  }
}

const ViewWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const DashboardWrapper = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
`;

const ViewContentWrapper = styled.div`
  width: 100%;
  overflow: auto;
`;

const ViewContent = styled.div`
  max-width: 840px;
  margin: 0 auto;
`;

const Sidebar = styled.div`
  width: 33%;
  max-width: 640px;
  overflow: auto;
  background-color: white;
`;

const PageTitle = styled.h2`
  padding: .9rem 1.5rem;
`;

const RankingWrapper = styled.div`
  padding: .9rem 1.5rem;
  display: flex;
  align-items: center;
  background: white;
  margin: 1rem;
  border-radius: 8px;
  box-shadow: 0px 3px 15px rgba(0,0,0,0.1);
`;

const RankingIndex = styled.div`
  font-weight: bold;
  margin-right: 1.5rem;
  width: 2rem;
  text-align: center;
`;

const RankingImage = styled.div`
  margin-right: 1rem;
  border-radius: 50%;
  height: 48px;
  width: 48px;
  flex-shrink: 0;
  border: 2px solid #ffaf79;
  background-color: #ffffff;
  background-image: url("${props => props.icon}");
  background-size: cover;
`;

const RankingName = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  width: 100%;
`;

const RankingPoints = styled.div`
  white-space: nowrap;
  font-size: 1.25rem;
`;

export default Dashboard;
