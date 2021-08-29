import Head from "next/head";
const { MongoClient } = require("mongodb");
import MeetupList from "../components/meetups/MeetupList";

const Homepage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://test:test1234@cluster0.qucek.mongodb.net/maxNextCrash?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");
  const meetups = await collection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => {
        const formatted = {
          ...meetup,
          id: meetup._id.toString(),
        };
        delete formatted._id;
        return formatted;
      }),
    },
    revalidate: 10,
  };
};

export default Homepage;
