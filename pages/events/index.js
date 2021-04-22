import { getAllEvents } from "../../helpers/api-util";
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { Fragment } from "react";
import { useRouter } from 'next/router';

import Head from 'next/head';

const AllEventsPage = (props) => {
  const events = props.events;
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <Head>
        <title>Events</title>
        <meta name="description" content="List of great events!" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events
    },
    revalidate: 600
  }
}

export default AllEventsPage;