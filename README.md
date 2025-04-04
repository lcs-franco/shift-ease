ShiftEASE

This project is a Software as a Service (SAAS) developed for companies operating in shift-based and on-call work environments. The platform provides users with an overview of schedules and allows them to access their individual shifts in an intuitive and organized way.

🚀 Features:

Employee Dashboard: Personalized display of individual schedules.

Shift Swap Requests: Employees can request shift exchanges.

Schedule Management: Create, edit, and view shifts and schedules.

Department Management: Organize the company by departments.

Robust Authentication: Secure authentication using JWT tokens.

🛠️ Technologies Used:

Back-end: Node.js, Nest, PostgreSQL

Front-end: React.js, Vite

⚡ Prerequisites:

NVM and Node.js (version 20.11)

Yarn installed

Docker Compose installed

Configure environment variables according to the .env.example files

🔧 Execution Steps:

Navigate to the APPS/API folder and run the command to start the database in a Docker container:
```yarn db:run```

Run Prisma migrations:
```yarn prisma migrate dev```  

Seed the database:
```yarn db:seed``` 

To start the project, run the following command in the root folder:
```yarn dev```

✒️ Authors:

 [Pablo Matheus](https://github.com/itspablomontes)  
 [Lucas Franco](https://github.com/lcs-franco)  
 [Lucas Donato](https://github.com/LGDonato)  
