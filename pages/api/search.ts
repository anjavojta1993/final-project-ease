import { NextApiRequest, NextApiResponse } from 'next';
import { getFilteredTherapistsAndSpecializations } from '../../util/database';

// export type SearchTherapist =
//   | { filteredTherapistsSpecializations: TherapistSpecializationType }
//   | { errors: ApplicationError[] };

// An API Route needs to define the response
// that is returned to the user
export default async function Search(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    // Destructure relevant information from the request body
    const { clientRegion, clientZipCode, clientSpecializationsIds } = req.body;

    // calling the function that inserts the info in the database and I pass the parameters that I need inside this function, but that doesnt mean I am inserting all of these parameters into the database table
    const filteredTherapistsSpecializations =
      await getFilteredTherapistsAndSpecializations(
        clientRegion,
        clientZipCode,
        clientSpecializationsIds,
      );

    console.log(
      'filtered therapists and specializations',
      filteredTherapistsSpecializations,
    );

    return res.status(200).json({
      filteredTherapistsSpecializations: filteredTherapistsSpecializations,
    });
  }
}
