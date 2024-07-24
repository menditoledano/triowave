const input_data = [
    {
        "Country": "Georgia",
        "City": "Alpharetta",
        "Longitude": -84.2941,
        "Latitude": 34.0754,
        "Communities": [
            {
                "Community": "Christian_evangelists_influences",
                "Size": 66566,
                "Pct_evangelical_christians": 0.299987982,
                "Pct_of_jews": 0.028693327,
                "SM_followers": 781947,
                "SM_coverage_rate": 409.3963351
            },
            {
                "Community": "Evangelical_community",
                "Size": 66255,
                "Pct_evangelical_christians": 0.30186401,
                "Pct_of_jews": 0.0075466,
                "SM_followers": 38309,
                "SM_coverage_rate": 76.618
            }
        ]
    },
    {
        "Country": "California",
        "City": "Aptos",
        "Longitude": -121.904,
        "Latitude": 36.9786,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 6220,
                "Pct_evangelical_christians": 0.321543408,
                "Pct_of_jews": 0.008038585,
                "SM_followers": 9499,
                "SM_coverage_rate": 189.98
            }
        ]
    },
    {
        "Country": "North Carolina",
        "City": "Asheville",
        "Longitude": -82.537711,
        "Latitude": 35.610154,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 93350,
                "Pct_evangelical_christians": 0.26780932,
                "Pct_of_jews": 0.012854847,
                "SM_followers": 521,
                "SM_coverage_rate": 0.434166667
            }
        ]
    },
    {
        "Country": "Georgia",
        "City": "Athens",
        "Longitude": -83.377322,
        "Latitude": 33.949582,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 127315,
                "Pct_evangelical_christians": 0.196363351,
                "Pct_of_jews": 0.011781801,
                "SM_followers": 208,
                "SM_coverage_rate": 0.138666667
            }
        ]
    },
    {
        "Country": "Georgia",
        "City": "Atlanta",
        "Longitude": -84.388,
        "Latitude": 33.749,
        "Communities": [
            {
                "Community": "Christian_evangelists_influences",
                "Size": 498715,
                "Pct_evangelical_christians": 0.299998997,
                "Pct_of_jews": 0.023861324,
                "SM_followers": 1542484,
                "SM_coverage_rate": 129.6205042
            },
            {
                "Community": "Evangelical_community",
                "Size": 498715,
                "Pct_evangelical_christians": 0.200515324,
                "Pct_of_jews": 0.070180364,
                "SM_followers": 150392,
                "SM_coverage_rate": 4.296914286
            },
            {
                "Community": "Jewish_community",
                "Size": 498715,
                "Pct_evangelical_christians": 0.299998997,
                "Pct_of_jews": 0.023861324,
                "SM_followers": 5901,
                "SM_coverage_rate": 0.495882353
            }
        ]
    },
    {
        "Country": "Texas",
        "City": "Austin",
        "Longitude": -97.6,
        "Latitude": 30.24,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 978908,
                "Pct_evangelical_christians": 0.102154646,
                "Pct_of_jews": 0.008172372,
                "SM_followers": 27871,
                "SM_coverage_rate": 3.483875
            },
            {
                "Community": "Jewish_community",
                "Size": 978908,
                "Pct_evangelical_christians": 0.102154646,
                "Pct_of_jews": 0.008172372,
                "SM_followers": 5100,
                "SM_coverage_rate": 0.6375
            }
        ]
    },
    {
        "Country": "Georgia",
        "City": "Bethlehem",
        "Longitude": -83.706432,
        "Latitude": 33.934236,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 601,
                "Pct_evangelical_christians": 0.332778702,
                "Pct_of_jews": 0.016638935,
                "SM_followers": 662,
                "SM_coverage_rate": 66.2
            }
        ]
    },
    {
        "Country": "California",
        "City": "Beverly Hills",
        "Longitude": -118.40094,
        "Latitude": 34.06944,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 34362,
                "Pct_evangelical_christians": 0.291019149,
                "Pct_of_jews": 0.029101915,
                "SM_followers": 29000,
                "SM_coverage_rate": 29
            }
        ]
    },
    {
        "Country": "North Carolina",
        "City": "Boone",
        "Longitude": -81.674679,
        "Latitude": 36.216799,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 19205,
                "Pct_evangelical_christians": 0.312418641,
                "Pct_of_jews": 0.015620932,
                "SM_followers": 101,
                "SM_coverage_rate": 0.336666667
            }
        ]
    },
    {
        "Country": "Montana",
        "City": "Bozeman",
        "Longitude": -111.0134419,
        "Latitude": 45.67216095,
        "Communities": [
            {
                "Community": "Jewish_community",
                "Size": 46400,
                "Pct_evangelical_christians": 0.5,
                "Pct_of_jews": 0.002155172,
                "SM_followers": 4800,
                "SM_coverage_rate": 48
            }
        ]
    },
    {
        "Country": "Tennessee",
        "City": "Brentwood",
        "Longitude": -86.7828,
        "Latitude": 36.0331,
        "Communities": [
            {
                "Community": "Jewish_community",
                "Size": 43268,
                "Pct_evangelical_christians": 0.5,
                "Pct_of_jews": 0.011555884,
                "SM_followers": 1600,
                "SM_coverage_rate": 3.2
            }
        ]
    },
    {
        "Country": "Indiana",
        "City": "Carmel",
        "Longitude": -86.1093,
        "Latitude": 39.9784,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 101068,
                "Pct_evangelical_christians": 0.197886571,
                "Pct_of_jews": 0.009894329,
                "SM_followers": 19000,
                "SM_coverage_rate": 19
            }
        ]
    },
    {
        "Country": "Texas",
        "City": "Carrollton",
        "Longitude": -96.92887,
        "Latitude": 32.964293,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 133434,
                "Pct_evangelical_christians": 0.299773671,
                "Pct_of_jews": 0.007494342,
                "SM_followers": 18000,
                "SM_coverage_rate": 18
            }
        ]
    },
    {
        "Country": "North Carolina",
        "City": "Cary",
        "Longitude": -78.835713,
        "Latitude": 35.788202,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 170282,
                "Pct_evangelical_christians": 0.352356679,
                "Pct_of_jews": 0.017617834,
                "SM_followers": 3081,
                "SM_coverage_rate": 1.54
            }
        ]
    },
    {
        "Country": "North Carolina",
        "City": "Charlotte",
        "Longitude": -80.835,
        "Latitude": 35.226944,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 874579,
                "Pct_evangelical_christians": 0.250083342,
                "Pct_of_jews": 0.018746249,
                "SM_followers": 1526,
                "SM_coverage_rate": 0.174
            },
            {
                "Community": "Jewish_community",
                "Size": 874579,
                "Pct_evangelical_christians": 0.250083342,
                "Pct_of_jews": 0.018746249,
                "SM_followers": 30300,
                "SM_coverage_rate": 3.471666667
            }
        ]
    },
    {
        "Country": "South Carolina",
        "City": "Columbia",
        "Longitude": -81.034811,
        "Latitude": 34.001374,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 137694,
                "Pct_evangelical_christians": 0.327275206,
                "Pct_of_jews": 0.019579472,
                "SM_followers": 710,
                "SM_coverage_rate": 0.355
            }
        ]
    },
    {
        "Country": "Ohio",
        "City": "Columbus",
        "Longitude": -82.998794,
        "Latitude": 39.961178,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 898553,
                "Pct_evangelical_christians": 0.097581333,
                "Pct_of_jews": 0.008504837,
                "SM_followers": 6219,
                "SM_coverage_rate": 0.692111111
            }
        ]
    },
    {
        "Country": "Texas",
        "City": "Coppell",
        "Longitude": -96.9935,
        "Latitude": 32.981,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 42883,
                "Pct_evangelical_christians": 0.250104399,
                "Pct_of_jews": 0.00833682,
                "SM_followers": 134,
                "SM_coverage_rate": 0.134
            }
        ]
    },
    {
        "Country": "Texas",
        "City": "Corpus Christi",
        "Longitude": -97.396381,
        "Latitude": 27.804417,
        "Communities": [
            {
                "Community": "Jewish_community",
                "Size": 316381,
                "Pct_evangelical_christians": 0.5,
                "Pct_of_jews": 0.007066745,
                "SM_followers": 18400,
                "SM_coverage_rate": 5.8
            }
        ]
    },
    {
        "Country": "North Carolina",
        "City": "Cramerton",
        "Longitude": -81.071744,
        "Latitude": 35.236441,
        "Communities": [
            {
                "Community": "Evangelical_community",
                "Size": 4023,
                "Pct_evangelical_christians": 0.3,
                "Pct_of_jews": 0.012236,
                "SM_followers": 55,
                "SM_coverage_rate": 1.833333333
            }
        ]
    },
    {
        "Country": "Texas",
        "City": "Dallas",
        "Longitude": -96.7969,
        "Latitude": 32.7763,
        "Communities": [
            {
                "Community": "Christian_evangelists_influences",
                "Size": 1356780,
                "Pct_evangelical_christians": 0.299997996,
                "Pct_of_jews": 0.016434766,
                "SM_followers": 2406508,
                "SM_coverage_rate": 177.3663158
            },
            {
                "Community": "Evangelical_community",
                "Size": 1356780,
                "Pct_evangelical_christians": 0.125674262,
                "Pct_of_jews": 0.038476998,
                "SM_followers": 327611,
                "SM_coverage_rate": 9.697382353
            },
            {
                "Community": "Jewish_community",
                "Size": 1356780,
                "Pct_evangelical_christians": 0.299997996,
                "Pct_of_jews": 0.016434766,
                "SM_followers": 43400,
                "SM_coverage_rate": 3.983529412
            }
        ]
    }
]
;

function convertData(data) {
    const countriesDict = {};
    function getRandomPercentage() {
        const min = 0.001;
        const max = 0.05;
        const precision = 2;
        const factor = Math.pow(10, precision);
        const random = Math.floor(Math.random() * ((max - min) * factor + 1)) + min * factor;
        return (random / factor).toFixed(2);
    }

    data.forEach(entry => {
        const countryName = entry.Country;
        const cityName = `${entry.City}, ${entry.Country}`;
        const city = {
            name: cityName,
            coordinates: {
                latitude: entry.Latitude,
                longitude: entry.Longitude
            },
            attributes: {
                "Christian evangelists": entry.Communities.reduce((sum, community) => {
                    return sum + (community.Community.includes("Christian_evangelists") ? community.Size : 0);
                }, 0)
            },
            communities: []
        };
let counter =0.1;
        entry.Communities.forEach(community => {
            const communityData = {
                name: community.Community.replace(/_/g, " "),
                size: community.Size,
                SM_followers: community.SM_followers,
                SM_coverage_rate: community.SM_coverage_rate,
                coordinates: {
                    latitude: entry.Latitude + parseFloat(getRandomPercentage()), // Adding slight offset for coordinates
                    longitude: entry.Longitude - parseFloat(getRandomPercentage())
                
                },
                attributes: {
                    Pct_evangelical_christians: community.Pct_evangelical_christians,
                    Pct_of_jews: community.Pct_of_jews
                }
            };
            city.communities.push(communityData);
            counter += getRandomPercentage()
        });

        if (!countriesDict[countryName]) {
            countriesDict[countryName] = { name: countryName, cities: [] };
        }

        countriesDict[countryName].cities.push(city);
    });

    return { countries: Object.values(countriesDict) };
}

// Convert the data
const converted_data = convertData(input_data);

// Print the converted data in JSON format
console.log(JSON.stringify(converted_data, null, 4));

