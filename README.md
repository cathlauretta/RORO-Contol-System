# Room Repair and Occupancy Control System
## IF3152 Rekayasa Perangkat Lunak STI

## Table of Contents
- [Program Description](#program-description)
- [Requirements](#requirements)
- [How to Run the Program](#how-to-run-the-program)
- [Database Schema](#database-schema)
- [Use Case Implementation](#use-case-implementation)
- [Project Structure](#project-structure)
- [Authors](#authors)

## Program Description
Room Repair and Occupancy Control System (RORO Control System) is a web-based software to manage room and hotel facilities repairment. 

## Requirements
- [NodeJS](https://nodejs.org/en/download)

## How to Run the Program
1. Clone this repository
   ```sh
   git clone https://gitlab.informatika.org/agent-47/if3152-2023-k01-07-roro-control-system.git
   ```

2. Change the directory to the cloned repository
   ```sh
   cd if3152-2023-k01-07-roro-control-system
   ```

3. Install the required package
   ```
   npm install
   ```

4. Run the program
   ```
   npm run dev
   ```

5. Open the program in a new browser tab or you can access the program on ``localhost:3000``

## Database Schema
<img src="doc/SchemaDatabase.png">

## Use Case Implementation
| Use Case | Description |
|---|---|
| Use Case 1 | Log In |
| Use Case 2 | View Room List |
| Use Case 3 | Add New Room |
| Use Case 4 | Change Room Data |
| Use Case 5 | View Report List |
| Use Case 6 | Add New Report |
| Use Case 7 | Mark a Room for Repair |
| Use Case 8 | Remove Repair Mark |
| Use Case 9 | View Employee List |
| Use Case 10 | Add New Employee |
| Use Case 11 | Change Employee Data |

| | 18221045 | 18221157 | 18221169 | 18221171 | Unit Testing |
|---|---|---|---|---|---|
|| Ivan Aldy Ganesen | Cathleen Lauretta | Ferdinand Refrandt | Hans Stephano Edbert N |
| UC 1 | &check; | | | |
| UC 2 | &check; | &check; | | |
| UC 3 | | | &check; | &check; |
| UC 4 | | | &check; | |
| UC 5 | &check; | &check; | | |
| UC 6 | | | | &check; |
| UC 7 | | | &check; | |
| UC 8 | | | &check; | |
| UC 9 | &check; | &check; | | |
| UC 10 | | | | &check; |
| UC 11 | | | &check;| |


## Project Structure
    .
    ├─ doc                  # Contains database schema and screenshots of application
    ├─ prisma               # Contains prisma library to CRUD database
    ├─ public               # Contains icon used in the application
        └─ icons
    └─ src                  # Contains source code of the application
        ├─ app              # Consist of the routing in the app and pages
            ├─ api
            ├─ employee     
            ├─ login
            ├─ profile
            ├─ report
            └─ room
        ├─ components       # Consist of reusable components in the program
        ├─ pages            # Consist of API interface
            └─ api
        └─ types            # Consist of authentication library from Next JS

## Authors
| Student ID | Name |
|-----|----|
| 18221045 | Ivan Aldy Ganesen |
| 18221157 | Cathleen Lauretta |
| 18221169 | Ferdinand Refrandt |
| 18221171 | Hans Stephano Edbert N |

© Agent 47