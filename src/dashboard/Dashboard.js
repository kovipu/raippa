import React, { Component } from 'react';
import styled from 'styled-components';
import openSocket from 'socket.io-client';
import FlipMove from 'react-flip-move';
import EventFlow from './../common/EventFlow';
import Bodium from './../common/Bodium';
import NavigationBar from "../navigation/NavigationBar";
import fireIcon from '../fire.svg';
import theme from '../theme';
let socket;

// TODO: Move to env variable
const RMARKET_API_URL = 'https://rmarket-backend.herokuapp.com';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      events: [],
      user: { "idx": 104, "workEmail": "jesse.rauha@r-market.zorg", "icon": "https://scontent-sjc3-1.cdninstagram.com/vp/d8e151a83dcea0e2f8a522e939cb7501/5D38BBB2/t51.2885-19/s320x320/37040022_224335601554897_1517153809552375808_n.jpg?_nc_ht=scontent-sjc3-1.cdninstagram.com", "firstName": "Jesse", "lastName": "Rauha", "store": "dfc10f06-bf92-43c0-6464-62c1b52fc71e", "employedSince": "2016-02-09T21:25:230Z", "isManager": true, "points": 164 }
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

  firePerson = (idx) => {
    return fetch(`${RMARKET_API_URL}/employees/${idx}`, {
      method: 'delete'
    })
    .then(res => {
      if (res.ok) {
        console.log('Employee was fired succesfully.');
        this.setState({
          employees: this.state.employees.filter(e => e.idx !== idx),
        });
        return;
      }
      console.log('Error occured while firing user.');
    });
  }

  componentWillUnmount() {
    socket.disconnect();
  }

  render() {
    const { employees, events, user } = this.state;
    const [first, second, third, ...restOfTheEmployees]=employees;

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
                    {user.isManager ? <FireButton title="Erota työntekijä." onClick={() => this.firePerson(e.idx)}><img src={fireIcon} /></FireButton> : <div />}
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
  display: none;
  width: 33%;
  max-width: 640px;
  overflow: auto;
  background-color: white;

  ${theme.breakpoint.md} {
    display: block;
  }
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

const FireButton = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  margin-left: 1rem;

  img {
    color: inherit;
  }

  :hover {
    color: red;
    background: whitesmoke;
  }
`

export default Dashboard;
