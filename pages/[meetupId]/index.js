import Head from "next/head";
const { MongoClient, ObjectId } = require("mongodb");
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
};

export const getStaticPaths = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://test:test1234@cluster0.qucek.mongodb.net/maxNextCrash?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");
  const meetups = await collection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => {
      return {
        params: {
          meetupId: meetup._id.toString(),
        },
      };
    }),
  };
};

export const getStaticProps = async (context) => {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://test:test1234@cluster0.qucek.mongodb.net/maxNextCrash?retryWrites=true&w=majority"
  );
  const db = client.db();
  const collection = db.collection("meetups");
  const data = await collection.findOne({ _id: ObjectId(meetupId) });
  const meetupData = {
    ...data,
    id: data._id.toString(),
  };
  delete meetupData._id;
  client.close();

  return {
    props: {
      meetupData,
    },
  };
};

export default MeetupDetails;
