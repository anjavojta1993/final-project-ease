import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../../components/Layout';
import { ApplicationError, Therapist, User } from '../../util/types';

type Props = {
  user?: User;
  therapist?: Therapist;
  email: string;
  errors?: ApplicationError[];
};

const pageContainer = css`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

const formContainer = css`
  display: flex;
  box-shadow: 0 7px 17px rgb(0 0 0 / 13%);
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 60vw;
  //background-color: orange;
  border-radius: 8px;
  border: 1px solid black;
  padding: 5px;
  height: 95%;
`;

const inputsContainer = css`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 500px;
  margin-right: 5px;
  margin-bottom: 10px;
`;

// define const for regions

const vienna = 'Vienna';
const burgenland = 'Burgenland';
const upperaustria = 'Upper Austria';
const loweraustria = 'Lower Austria';
const salzburg = 'Salzburg';
const tyrol = 'Tyrol';
const vorarlberg = 'Vorarlberg';
const carinthia = 'Carinthia';
const styria = 'Styria';

export default function SingleClientProfile(props: Props) {
  const [companyName, setCompanyName] = useState('');
  const [costPerHour, setCostPerHour] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [region, setRegion] = useState('');
  const [specializations, setSpecializations] = useState('');

  // Show message if user not allowed
  const errors = props.errors;
  if (errors) {
    return (
      <Layout email={props.email}>
        <Head>
          <title>Error</title>
        </Head>
        Error: {errors[0].message}
      </Layout>
    );
  }

  // Show message if user does not exist
  if (!props.user) {
    return (
      <Layout email={props.email}>
        <Head>
          <title>User not found!</title>
        </Head>
        User not found
      </Layout>
    );
  }

  if (!props.therapist) {
    console.log('role of client', props.user);
    return (
      <Layout email={props.email}>
        <Head>
          <title>
            Client Profile page for {props.user.firstName} {props.user.lastName}
          </title>
        </Head>

        <h1 data-cy="profile-page-h1">Client Profile Page</h1>

        <div>
          id: <span data-cy="profile-page-id">{props.user.id}</span>
        </div>

        <div>
          email: <span data-cy="profile-page-id">{props.user.email}</span>
        </div>
        <div>first_name: {props.user.firstName}</div>
        <div>last_name: {props.user.lastName}</div>
      </Layout>
    );
  } else {
    return (
      <Layout email={props.email}>
        <Head>
          <title>Therapist Profile page</title>
        </Head>
        <div css={pageContainer}>
          <div css={formContainer}>
            <h1 data-cy="profile-page-h1">Therapist Profile Page</h1>

            <div>
              <div css={inputsContainer}>
                <div>
                  <label htmlFor="company-name">
                    What is your company name?{' '}
                  </label>
                  <input
                    placeholder="e.g. Mindful zone, Dr. Antje Enzi"
                    aria-label="company-name"
                    data-cy="company-name"
                    value={companyName}
                    onChange={(event) => {
                      setCompanyName(event.currentTarget.value);
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="cost-per-hour">
                    Please enter your average cost/hour for a session?
                  </label>
                  <input
                    placeholder="e.g. 100"
                    aria-label="cost-per-hour"
                    data-cy="cost-per-hour"
                    value={costPerHour}
                    onChange={(event) => {
                      setCostPerHour(event.currentTarget.value);
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="street-name">
                    Please enter your address:
                  </label>
                  <input
                    placeholder="Street name e.g. Gartenweg"
                    aria-label="street-name"
                    data-cy="street-name"
                    value={streetAddress}
                    onChange={(event) => {
                      setStreetAddress(event.currentTarget.value);
                    }}
                  />
                  <input
                    placeholder="Street number e.g. 4"
                    aria-label="street-number"
                    data-cy="street-number"
                    value={streetNumber}
                    onChange={(event) => {
                      setStreetNumber(event.currentTarget.value);
                    }}
                  />
                </div>
                <input
                  placeholder="ZIP Code e.g 1010"
                  aria-label="zip-code"
                  data-cy="zip-code"
                  value={zipCode}
                  onChange={(event) => {
                    setZipCode(event.currentTarget.value);
                  }}
                />
              </div>
              <select
                id="region"
                value={region}
                onChange={(event) => {
                  setRegion(event.currentTarget.value);
                }}
              >
                <option value={vienna}>Vienna</option>
                <option value={burgenland}>Burgenland</option>
                <option value={loweraustria}>Lower Austria</option>
                <option value={upperaustria}>Upper Austria</option>
                <option value={styria}>Styria</option>
                <option value={salzburg}>Salzburg</option>
                <option value={vorarlberg}>Vorarlberg</option>
                <option value={tyrol}>Tyrol</option>
                <option value={carinthia}>Carinthia</option>
              </select>

              <div>
                <label htmlFor="website-url">
                  Please enter your website url:
                </label>
                <input
                  placeholder="e.g. https://www.mindfultherapy.com"
                  aria-label="website-url"
                  data-cy="website-url"
                  value={websiteUrl}
                  onChange={(event) => {
                    setWebsiteUrl(event.currentTarget.value);
                  }}
                />

                <div>
                  <label htmlFor="video-url">
                    Please upload a video in vertical view (max. 60 seconds)
                    where you answer the following 3 questions:
                    <ol>
                      <li>Who are you and what are you specialized on?</li>
                      <li>
                        Describe a typical situation a client would come to you
                        with.
                      </li>
                      <li>Why do you love what you do?</li>
                    </ol>
                  </label>
                  <input
                    placeholder="e.g. https://www.mindfultherapy.com"
                    aria-label="website-url"
                    data-cy="website-url"
                    value={websiteUrl}
                    onChange={(event) => {
                      setWebsiteUrl(event.currentTarget.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { getUserById, getValidSessionByToken, getTherapistByUserId } =
    await import('../../util/database');

  const session = await getValidSessionByToken(
    context.req.cookies.sessionToken,
  );

  if (!session || session.userId !== Number(context.query.userId)) {
    return {
      props: {
        user: null,
        errors: [{ message: 'Access denied' }],
      },
    };
  }

  const therapist = await getTherapistByUserId(Number(context.query.userId));

  const user = await getUserById(Number(context.query.userId));
  return {
    props: {
      user: user,
      therapist: therapist,
    },
  };
}
