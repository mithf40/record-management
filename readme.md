Demo of this project can be found [here](https://www.youtube.com/watch?v=aE1Cxbio5l8)

**System Dependencies**:
    
    - Linux
    - NodeJs v8.10.0+
    - npm
    - Ganache(for deploying on local network)
    - Metamask(preferably inn Chrome Browser)
    - mysql-server

**Install these dependencies using npm**:
    
    - "body-parser": "^1.18.3",
    - "brfs": "^2.0.2",
    - "browserify": "^16.2.3",
    - "crypto": "^1.0.1",
    - "cryptr": "^4.0.2",
    - "express": "^4.16.4",
    - "mysql2": "^1.6.5",
    - "sequelize": "^5.2.13",
    - "solc": "^0.5.7",
    - "web3": "^1.0.0-beta.34"

**mysql account setup using following command**:
    
    CREATE USER 'cs731'@'%' IDENTIFIED BY 'Abcd_1234';
    GRANT ALL PRIVILEGES ON * . * TO 'cs731'@'%';
    FLUSH PRIVILEGES;

**To run this app, run the command from root directory in the project**:
    
    'node app.js'

**Also link your Metamask account with Ganache before running.**

**Following features are supported:**
    
    - Register patients from 'localhost:8081/register'
    - Give create permission to doctors from 'localhost:8081/patient'
    - Create record for a patient from 'localhost:8081/record'
    - View a record of a particular patient from 'localhost:8081/view'
    - Share a record from 'localhost:8081/share'



