import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const EventPoints = ({value}) => {
  if (value > 0) {
    return <EventPointsGood>{value}</EventPointsGood>
  } else {
    return <EventPointsBad>{value}</EventPointsBad>
  }
}

class EventFeed extends Component {
  render() {
    const { events } = this.props;

    return (
      <EventFeedWrapper>
        <PageTitle>Tapahtumat</PageTitle>
        {events.map((e, i) => (
          <RankEvent key={e.idx}>
            <EventInfo>
              <EventReason>{e.employee.firstName} - {e.reason}</EventReason>
              <EventDate>{moment(e.dateTime).locale('fi').fromNow()}</EventDate>
            </EventInfo>
            <EventPoints value={e.delta}/>
          </RankEvent>
        ))}
      </EventFeedWrapper>
    );
  }
}

const EventFeedWrapper = styled.div`
  height: 100vh;
`

const PageTitle = styled.h2`
  padding: .9rem 1.5rem;
`;

const RankEvent = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const EventInfo = styled.div`
  width: 100%;
  margin-right: .5rem;
`;

const EventReason = styled.div`
  font-weight: 500;
  font-size: 1.25rem;
  width: 100%;
  margin-bottom: .5rem;
`;

const EventDate = styled.div`

`;

const EventPointsGood = styled.div`
  display: flex;
  text-align: center;
  color: white;
  width: 1.8rem;
  height: 1.8rem;
  padding: 4px;
  border-radius: 50%;
  background: green;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
`;

const EventPointsBad = styled.div`
  display: flex;
  text-align: center;
  color: white;
  width: 1.8rem;
  height: 1.8rem;
  padding: 4px;
  border-radius: 50%;
  background: red;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;
`;

export default EventFeed;
