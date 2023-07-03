![Abhiyaan](/public/icon.png)

# Super Admin Dashboard

## How to start 
1. create a ```.env.local``` file in root directory 
```
NEXT_PUBLIC_URL=your_url
```
2. run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Routes
- Home ```/```
- Village ```/village```
    - VillageDetails ```/village/[id]```    
        1. Notice ```/village/[id]/notice```        
        2. Complaints ```/village/[id]/complaint```
        3. News ```/village/[id]/news```
- News ```/news/[id]```
- Contact ```/contact```
- About ```/about```
- Login ```/auth/login```

# Components
- ```Header.js```
- ```Footer.js```
- ```ListVillage.js```
- ```Loader.js```
- ```ImageSlidder.js```
- ```MemberCard.js```
- ```Notice.js```
- ```Complaint.js```
- ```News.js```

# Utils
- ```checkAuth.js```
- ```Logout.js```
- ```UploadImage.js```

# API
- ```ApiCall.js```


***
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)