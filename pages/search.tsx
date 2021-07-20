import { css } from '@emotion/react';
import Head from 'next/head';
import { useRef, useState } from 'react';
import Select from 'react-select';
import { ValueType } from 'react-select/lib/types';
import Layout from '../components/Layout';
import { h1, h2, largeText, normalText } from '../styles/sharedStyles';
import {
  ApplicationError,
  RegionType,
  Specialization,
  SpecializationType,
  Therapist,
  TherapistRegionZipCode,
  TherapistSpecializationType,
  User,
  ZipCodeType,
} from '../util/types';

type Props = {
  user?: User;
  therapist?: Therapist;
  email: string;
  errors?: ApplicationError[];
  specializationName: string;
  specialization: SpecializationType[];
  therapistSpecializations: TherapistSpecializationType[];
  therapistRegionAndZipCode: TherapistRegionZipCode[];
  userId: Number;
};

const pageContainer = css`
  position: relative;
  display: flex;
  width: 100%;
  height: 90vh;
  //background-color: green;
  flex-direction: column;
`;

const searchContainer = css`
  display: flex;
  flex-direction: column;
  background-color: green;
`;

const resultsContainer = css`
  display: flex;
  background-color: orange;
  flex-direction: column;
`;

const imageContainer = css`
  //position: absolute;
  //background-color: blue;
  top: 30%;
  text-align: right;
  margin-left: auto;
  margin-right: 0;

  width: 1000px;
  /* left: 50%;
  transform: translateX(-50%); */

  > img {
    width: 70%;
    height: auto;
    margin-right: 0;
    //background-color: orange;
  }
`;

const headingContainer = css`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  //background-color: orange;

  h1 {
    font-size: ${h1};
    line-height: 1.5em;
    font-weight: 400;
    text-align: center;
    text-transform: uppercase;
  }
`;

const itemsContainer = css`
  display: flex;
  flex-direction: row;
  //background-color: green;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100px;
`;

const singleItemContainerSpecializations = css`
  display: flex;
  margin-right: 20px;
  flex-direction: column;
  justify-content: center;
  //background-color: red;
  width: 400px;
  height: 100px;
`;

const singleItemContainer = css`
  display: flex;
  justify-content: center;
  margin-right: 20px;
  flex-direction: column;
  //background-color: red;
  width: 200px;
  height: 100px;
`;

const itemHeading = css`
  font-size: ${normalText};
  height: 20px;
  margin-bottom: 20px;
  margin-top: 10px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  //background-color: purple;
`;

const itemDropdown = css`
  align-content: center;
`;

const heroButtonsContainer = css`
  position: absolute;
  bottom: 10%;
  left: 10%;
  width: 800px;
  height: auto;
`;

const buttonStylesDark = css`
  display: inline-block;
  margin-left: 5%;
  margin-right: 5%;
  color: white;
  background-color: black;
  font-size: ${normalText};
  font-weight: 400;
  border: none;
  border-radius: 8px;
  padding: 16px 40px;
  letter-spacing: 2px;
  text-transform: uppercase;

  :hover {
    transform: scale(1.1, 1.1);
    -webkit-transform: scale(1.1, 1.1);
    -moz-transform: scale(1.1, 1.1);
    background-color: black;
    color: white;
    cursor: pointer;
  }
`;

const zipCodeOptions = [
  { value: '1010', label: '1010' },
  { value: '1020', label: '1020' },
  { value: '1030', label: '1030' },
  { value: '1040', label: '1040' },
  { value: '1050', label: '1050' },
  { value: '1060', label: '1060' },
  { value: '1070', label: '1070' },
  { value: '1080', label: '1080' },
  { value: '1090', label: '1090' },
  { value: '1100', label: '1100' },
  { value: '1110', label: '1110' },
  { value: '1120', label: '1120' },
  { value: '1130', label: '1130' },
  { value: '1140', label: '1140' },
  { value: '1150', label: '1150' },
  { value: '1160', label: '1160' },
  { value: '1170', label: '1170' },
  { value: '1180', label: '1180' },
  { value: '1190', label: '1190' },
  { value: '1200', label: '1200' },
  { value: '1210', label: '1210' },
  { value: '1220', label: '1220' },
  { value: '1230', label: '1230' },
];

// define const for regions

const regionOptions = [
  { value: 'vienna', label: 'Vienna' },
  { value: 'burgenland', label: 'Burgenland' },
  { value: 'upperaustria', label: 'Upper Austria' },
  { value: 'loweraustria', label: 'Lower Austria' },
  { value: 'salzburg', label: 'Salzburg' },
  { value: 'tyrol', label: 'Tyrol' },
  { value: 'vorarlberg', label: 'Vorarlberg' },
  { value: 'carinthia', label: 'Carinthia' },
  { value: 'styria', label: 'Styria' },
];

export default function SearchForTherapist(props: Props) {
  // Matchmaking function for Region and ZIP code
  // const checkRegionAndZipCode = () => {
  //   therapistsWithOneSpecialization.map();
  // };

  // declare variables for matchMaking function
  // let therapistsWithOneSpecialization;

  //  // Matchmaking monster function

  // const matchMaking = () => {

  //   executeScroll();
  //   // this is the condition if the client chooses one specialization
  //   if (selectedSpecializations?.length === 1) {
  //     therapistsWithOneSpecialization =
  //       props.therapistSpecializations.filter(
  //         (therapistSpecialization) =>
  //           therapistSpecialization.specializationId ===
  //           selectedSpecializations[0].value,
  //       );
  //     const therapistsWithOneSpecializationRegionAndZipCode =
  //       props.therapistRegionAndZipCode.map((id) => props.therapistRegionAndZipCode.id === therapistsWithOneSpecialization.;
  //     // const checkRegionAndZipCode = () => {
  //     //   therapistsWithOneSpecialization;
  //     // };
  //     console.log(
  //       'whats inside the the array',
  //       therapistsWithOneSpecialization,
  //     );
  //   }
  // };

  // define variables needed for specialization dropdown
  const maxOptions = 4;

  const [selectedSpecializations, setSelectedSpecializations] = useState<
    SpecializationType[]
  >([]);

  console.log('client choice of specializations', selectedSpecializations);

  const handleTypeSelect = (selectedOption: SpecializationType[]) => {
    setSelectedSpecializations(selectedOption);
    console.log('selected option', selectedOption);
  };

  // these are objects

  const [region, setRegion] = useState<RegionType>();
  const [zipCode, setZipCode] = useState<ZipCodeType>();

  console.log('chosen region', region);
  console.log('chosen zip code', zipCode);
  console.log('selected client spec', selectedSpecializations);
  // define variable and functions for the smooth scrolling on submit of form

  const myRef = useRef(null);

  // run this function from an event handler or an effect to execute scroll
  const executeScroll = () => myRef.current.scrollIntoView();

  const [error, setError] = useState('');

  const [filteredTherapists, setFilteredTherapists] = useState([]);

  // function to send information to API
  const formSubmit = async (event: any) => {
    event.preventDefault();

    const response = await fetch(`/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        clientRegion: region?.value,
        clientZipCode: zipCode?.value,
        clientSpecializationsIds: selectedSpecializations.map(
          (spec) => spec.value,
        ),
      }),
    });

    executeScroll();

    const data = await response.json();
    setFilteredTherapists(data.filteredTherapistsSpecializations);
    console.log('data', data);
    console.log('data filtered', data.filteredTherapistsSpecializations);
    console.log('filtered therapists', filteredTherapists);

    if ('errors' in data) {
      setError(data.errors[0].message);
      return;
    }
  };

  return (
    <Layout email={props.email}>
      <Head>
        <title>Find a therapist</title>
      </Head>
      <div css={pageContainer}>
        <section css={searchContainer}>
          <div css={headingContainer}>
            <h1>What are you looking for?</h1>
          </div>
          <form onSubmit={formSubmit}>
            <div css={itemsContainer}>
              <div css={singleItemContainerSpecializations}>
                <div css={itemHeading}>I need help with:</div>
                <div css={itemDropdown}>
                  <Select
                    onChange={(selectedOption: ValueType<SpecializationType>) =>
                      handleTypeSelect(selectedOption as SpecializationType[])
                    }
                    isMulti
                    options={
                      selectedSpecializations.length === maxOptions
                        ? []
                        : props.specialization
                    }
                    noOptionsMessage={() => {
                      return selectedSpecializations.length === maxOptions
                        ? 'You cannot choose more than 4 specializations'
                        : 'No options available';
                    }}
                    value={selectedSpecializations}
                  />
                </div>
              </div>
              <div css={singleItemContainer}>
                <div css={itemHeading}>Region:</div>
                <div>
                  <Select
                    options={regionOptions}
                    value={region}
                    onChange={(event) => {
                      setRegion(event);
                    }}
                  />
                </div>
              </div>
              <div css={singleItemContainer}>
                <div css={itemHeading}>ZIP Code:</div>
                <div>
                  <Select
                    options={zipCodeOptions}
                    value={zipCode}
                    onChange={(event) => {
                      setZipCode(event);
                    }}
                  />
                </div>
              </div>
              <div css={singleItemContainer}>
                <div css={itemHeading} />
                <button css={buttonStylesDark}>Search</button>
              </div>
            </div>

            <div css={imageContainer}>
              <img
                src="/images/women_chatting_2.png"
                alt="two women sitting on floor and chatting in front of buildings and trees"
              />
            </div>
          </form>
        </section>
        <section css={resultsContainer}>
          <div css={headingContainer} ref={myRef}>
            <h1>Your matches</h1>
            {/* <p>{props.therapistSpecializations[0].specializationId}</p> */}
            {!filteredTherapists ? <div /> : <div>{filteredTherapists}</div>}
          </div>
        </section>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(
  region: RegionType,
  zipCode: ZipCodeType,
  selectedSpecializations: number[],
) {
  const {
    getAllSpecializations,
    getAllTherapistsSpecializations,
    getFilteredTherapistsAndSpecializations,
    getAllRegionsAndZipCodes,
  } = await import('../util/database');

  console.log('list of all specializations', getAllSpecializations);

  const specialization = await getAllSpecializations();
  console.log('specializations list', specialization);

  // this is an array of objects consisting of all specializationIds and therapistIds
  const therapistSpecializations = await getAllTherapistsSpecializations();
  console.log('therapist specializations list', therapistSpecializations);

  // this is an array of objects consisting of all regions & zip codes for each therapist id
  const therapistRegionAndZipCode = await getAllRegionsAndZipCodes();
  console.log('therapist region and zip code', therapistRegionAndZipCode);

  // const filteredTherapistsAndSpecializations =
  //   await getFilteredTherapistsAndSpecializations(
  //     region.value,
  //     zipCode.value,
  //     selectedSpecializations.map((spec: any) => spec.value),
  //   );
  // console.log('filtered therapists', filteredTherapistsAndSpecializations);
  // console.log('testing in props', selectedSpecializations);

  return {
    props: {
      specialization: specialization.map((spec) => {
        return {
          value: spec.id,
          label: spec.specializationName,
        };
      }),
      therapistSpecializations: therapistSpecializations,
      therapistRegionAndZipCode: therapistRegionAndZipCode,
      // filteredTherapistsAndSpecializations:
      //   filteredTherapistsAndSpecializations,
    },
  };
}
