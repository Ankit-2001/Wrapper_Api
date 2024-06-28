import axios from "axios";

const url = "https://north-america.api.capillarytech.com/v2/customers";

export async function addCustomer(req, res) {
  const accessToken = req.headers["x-cap-api-oauth-token"];

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
 const identifiers = req.body.attributeSets[0].customerIdentifiers.map(
   (identifier) => {
     return {
       type: identifier.type, 
       value:
         identifier.type === "email"
           ? `${identifier.value}@gmail.com`
           : identifier.value,
     };
   }
 );
  const data = {
    associatedWith: "bukl.till",
    profiles: [
      {
        firstName: `${firstName}`,
        lastName: `${lastName}`,

        identifiers: identifiers,
        commChannels: [
          {
            type: "mobile",
            value: "6783947457",
            primary: "true",
            verified: "true",
            meta: {
              residence: "true",
            },
          },
          {
            type: "email",
            value: "serena211darim@gmail.com",
            primary: "true",
            verified: "true",
            meta: {
              residence: "true",
            },
          },
        ],
        fields: {
          employee: "true",
          dateofbirth: "22-10-2000",
        },
        source: "INSTORE",
        accountId: "websiteBPCLSF",
      },
    ],
    extendedFields: {
      gender: "Female",

      city: "Sattari",
      state: "GOA",
      area: "House no 2051,opposite  Sesa Goa  Colony,",
      zip: "403505",
    },
    referralCode: "",
  };
  const config = {
    headers: {
      "Content-Type": "application/json",
      "X-CAP-API-OAUTH-TOKEN": accessToken,
    },
  };

  try {
    const responseData = await axios.post(url, data, config);
    res.status(200).json(responseData.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function getCustomerDetails(req, res) {
  const customerId = req.params.customerId;
  const source = "INSTORE";

  const getUrl = `${url}/${customerId}?source=${source}`;
  const accessToken = req.headers["x-cap-api-oauth-token"];

  const config = {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-CAP-API-OAUTH-TOKEN": accessToken,
    },
  };

  try {
    const responseData = await axios.get(getUrl, config);

    res.status(200).json(responseData.data);
  } catch (error) {
    res.status(500).json(error);
  }
}
